import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import { MDBDataTable } from 'mdbreact';

import DataSourceTypes from './DataSourceTypes.js'
import { typecastNumber, proper, properList } from './helpers';


export default class DataSourceTable extends Component {

  prepare_data() {
    this.data_length = this.props.data.length
    this.set_rows()
    this.set_titles()
    this.set_columns()
    this.setState({
      'data': this.props.data,
      'columns': this.columns,
      'notLoaded': false
    })
  }

  set_rows() {
    this.props.data.forEach((row, i) => {
      Object.keys(row).forEach(col_name => {
        if (row[col_name] == null || row[col_name] === 'null' ) {
          this.props.data[i][col_name] = ''
        } else if (row[col_name] !== '' && !isNaN(typecastNumber(row[col_name]))) {
          this.props.data[i][col_name] = typecastNumber(row[col_name])
        }
        else if (typeof row[col_name] == 'object') {
          this.parse_nested_data(row[col_name], col_name, i)
        }
      })
    })
  }

  set_titles() {
    this.typeData = DataSourceTypes[this.props.title]
    this.titles = properList(this.props.data[0])
    if ('description' in this.titles) { delete this.titles['description'] }
    console.log(this.props.title, "titles set:", this.titles)
  }

  set_columns() {
    this.columns = []
    Object.keys(this.titles).forEach((column, i) => {
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
    console.log(this.props.title, "columns set:", this.columns)
  }

  parse_nested_data(data, col_name, i) {
    // TODO: Find a lighter-weight solution for this process.
    Object.keys(data).forEach(data_name => {
      // In case more than just the name value is utilized, 
      // rename name cell to 'cell_xyz Name' until other data is extracted
      let cell_name = `${col_name} ${proper(data_name)}`

      // Assign nested data to it's own 'cell_xyz' column
      this.props.data[i][cell_name] = typecastNumber(data[data_name])
    })
    // Remove ' Name' from 'cell_xyz Name' column
    this.props.data[i][col_name] = this.props.data[i][`${col_name} Name`]
    delete this.props.data[i][`${col_name} Name`]
  }

  componentDidMount() {
    this.prepare_data()
  }

  render() {
    if (!this.state) {
      return (
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" color="#1591BD" height="100" width="100" />
        </div>
      )
    }
    return  (
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
    )
  }
}
