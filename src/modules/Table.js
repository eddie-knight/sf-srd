import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import { MDBDataTable } from 'mdbreact';

import { typecastNumber, proper, properList, limitLength, getLocal, setLocal } from './helpers';
import DataSourceModal from './Modal'
import DataDefinitions from './DataDefinitions';

export default class Table extends Component {

  async prepare_data() {
    this.data_length = this.props.data.length
    this.setAbbreviatedRelationalNames()
    this.setTableState()
    setLocal(`${this.props.title}-tableData`, {
      'columns': this.columns, 'rows': this.rows})
  }

  setTableState() {
    this.setRows()
    if (!this.columns) {
      console.log("Setting columns")
      this.setTitles()
      this.setColumns()  
    }
    this.setState({
      'rows': this.rows, 
      'columns': this.columns,
    })
  }

  setRows() {
    if (!this.rows) {
      console.log("setting rows from data:", this.props.data)
      this.rows = JSON.parse(JSON.stringify((this.props.data)))
    }
    this.rows.forEach((row, i) => {
      Object.keys(row).forEach(col_name => {
        if (row[col_name] == null || row[col_name] === 'null' ) {
          this.rows[i][col_name] = ''
        } else if (row[col_name] !== '' && !isNaN(typecastNumber(row[col_name]))) {
          this.rows[i][col_name] = typecastNumber(row[col_name])
        } else if (typeof row[col_name] === 'string') {
          this.rows[i][col_name] = limitLength(row[col_name], 120)
        }
          else if (typeof row[col_name] == 'object') {
          this.parseNestedData(row[col_name], col_name, i)
        }
      })
      let name = this.rows[i]['name']
      this.rows[i]['clickEvent'] = () => this.clickEvent(name)
    })
  }

  clickEvent(name) {
    this.refs.modal.show(name, this.props.title, this.props.section)
  }

  setTitles() {
    this.titles = properList(this.rows[0])
    delete this.titles['clickEvent']
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
  }

  setAbbreviatedRelationalNames() {
    this.abbreviatedRelationalNames = []
    let tableStructure = DataDefinitions[this.props.section][this.props.title]['table']
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
      this.rows[i][cell_name] = typecastNumber(data[data_name])
    })
    // Remove ' Name' from 'cell_xyz Name' column
    this.rows[i][col_name] = this.rows[i][`${col_name} Name`]
    delete this.rows[i][`${col_name} Name`]
  }

  componentDidMount() {
    if (!this.state) {
      let tableData = getLocal(`${this.props.title}-tableData`)
      if (Object.keys(tableData).length === 0) {
        console.log("preparing data")
        this.prepare_data()
      } else if (!this.rows) {
        this.rows = tableData['rows']
        this.columns = tableData['columns']
        this.setRows()
        this.setTableState()
      }
    }
  }

  render() {
    if (!this.state || !this.state.rows) {
      return (
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" color="#1591BD" height="100" width="100" />
        </div>
      )
    }
    return (
      <>
        <MDBDataTable
          hover
          striped
          bordered
          responsive
          small={this.state.columns.length >= 7}
          btn={true}
          sortable={true}
          paging={false}
          entries={this.data_length}
          entriesOptions={[10,25,50,this.data_length]}
          data={{
            'rows': this.state.rows,
            'columns': this.state.columns,
          }} />
          <DataSourceModal container={this} ref = "modal" />
      </>
    )
  }
}
