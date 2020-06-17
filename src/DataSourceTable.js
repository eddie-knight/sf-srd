import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import { MDBDataTable } from 'mdbreact';

import { typecastNumber, proper, columnToProper, properList } from './helpers';
import DataSourceModal from './DataSourceModal'
import DataSourceTypes from './DataSourceTypes';

export default class DataSourceTable extends Component {

  prepare_data() {
    this.data_length = this.props.data.length
    this.setAbbreviatedRelationalNames()
    this.setRows()
    this.setTitles()
    this.setColumns()
    this.setState({
      'data': this.props.data,
      'columns': this.columns,
      'loaded': true
    })
  }

  setRows() {
    this.props.data.forEach((row, i) => {
      Object.keys(row).forEach(col_name => {
        if (row[col_name] == null || row[col_name] === 'null' ) {
          this.props.data[i][col_name] = ''
        } else if (row[col_name] !== '' && !isNaN(typecastNumber(row[col_name]))) {
          this.props.data[i][col_name] = typecastNumber(row[col_name])
        }
        else if (typeof row[col_name] == 'object') {
          this.parseNestedData(row[col_name], col_name, i)
        }
        let name = this.props.data[i]['name']
        this.props.data[i]['clickEvent'] = () => this.clickEvent(name)
      })
    })
  }

  clickEvent(name) {
    this.refs.modal.show(name, this.props.title, this.props.section)
  }

  setTitles() {
    this.titles = properList(this.props.data[0])
    delete this.titles['clickEvent']
    if ('description' in this.titles) { delete this.titles['description'] }
    // console.log(this.props.title, "titles set:", this.titles)
  }

  setColumns() {
    this.columns = []
    Object.keys(this.titles).forEach(column => {
        let column_label = ''
        column_label = this.titles[column]
        this.columns.push({
          label: column_label,
          field: column,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        })
    })
    // console.log(this.props.title, "columns set:", this.columns)
  }

  setAbbreviatedRelationalNames() {
    this.abbreviatedRelationalNames = []
    let tableStructure = DataSourceTypes[this.props.section][this.props.title]['table']
    tableStructure.forEach(struct => {
      if (typeof struct === 'object') {
        Object.keys(struct).forEach(relationalTableName => {
          struct[relationalTableName].forEach(column => {
            if(column[0] === '_'){
              this.abbreviatedRelationalNames.push(column.slice(1))
            }  
          })
        })
      }
    })
  }

  parseNestedData(data, col_name, i) {
    // TODO: Find a lighter-weight solution for this process.
    Object.keys(data).forEach(data_name => {
      // In case more than just the name value is utilized, 
      // rename name cell to 'cell_xyz Name' until other data is extracted
      let cell_name = this.abbreviatedRelationalNames.includes(data_name) ? proper(data_name) : `${col_name} ${proper(data_name)}`
      // Assign nested data to it's own 'cell_xyz' column
      this.props.data[i][cell_name] = typecastNumber(data[data_name])
    })
    // Remove ' Name' from 'cell_xyz Name' column
    this.props.data[i][col_name] = this.props.data[i][`${col_name} Name`]
    delete this.props.data[i][`${col_name} Name`]
  }

  componentDidMount() {
    if (!this.state) {
      this.prepare_data()
    }
  }

  render() {
    if (!this.state || !this.state.loaded) {
      return (
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" color="#1591BD" height="100" width="100" />
        </div>
      )
    }

    return  (
      <>
        <div className="d-flex justify-content-center"><h2>{columnToProper(this.props.title)}</h2></div>
        <MDBDataTable
          hover
          striped
          bordered
          responsive
          order={['age', 'desc']}
          paging={false}
          entries={this.data_length}
          entriesOptions={[10,25,50,this.data_length]}
          data={{
            columns: this.state.columns,
            rows: this.state.data,
          }} />
          <DataSourceModal container={this} ref = "modal" />
      </>
    )
  }
}
