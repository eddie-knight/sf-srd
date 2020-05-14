import React, {Component} from 'react';
import { MDBDataTable } from 'mdbreact';

import { properList } from './helpers';

// class TableHead extends Component {
//   render() {
//     return (
//       <thead><tr>
//       {Object.keys(this.props.data[0]).map(column => (
//           <th key={column}>{column}</th>
//       ))}
//       </tr></thead>
//     )
//   }
// }

// class TableBody extends Component {
//   rows() {
//     let rows = this.props.data
//     return rows.map(function(row_data) {

//       function row(data) {
//         return Object.keys(data).map(function(item) {
//           return (<td>{data[item]}</td>)
//         })
//       }
//       return  (
//         <tr key={row_data['name']}>
//           {row(row_data)}
//         </tr>
//       )

//     })
//   }

//   render() {
//     return (
//       <tbody>{this.rows()}</tbody>
//     )
//   }
// }

class DataTable extends Component {

  render() {
    let titles = properList(this.props.data[0])
    if ('description' in titles) { delete titles['description'] }
    let data_length = this.props.data.length
    let _columns = []

    Object.keys(titles).forEach(column => (
      _columns.push({
        label: titles[column],
        field: column,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      })
    ))

    return (
      <MDBDataTable
        hover
        striped
        bordered
        responsive
        paging={false}
        entries={data_length}
        entriesOptions={[10,25,50,data_length]}
        data={{
          columns: _columns,
          rows: this.props.data,
        }} />
  );

  }
}

export default class DataSourceTable extends Component {
  render() {
    return  (
      <table className="table table-hover">
        <DataTable data={this.props.data} />
      </table>
    )
  }
}
