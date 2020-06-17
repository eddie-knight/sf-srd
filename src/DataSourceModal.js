import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'

import DataSourceTypes from './DataSourceTypes'
import DataSourceRequest from './DataSourceRequest'
import {columnToProper} from './helpers'

const DATA = {}

export default class DataSourceModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  getData(name, type, fields) {
    if (!DATA[type]) {
      DATA[type] = {}
    }
    if (!DATA[type][name]) {
      DataSourceRequest(
        type,
        fields,
        `(name_is: "${name}")`
      ).then(response => {
        DATA[type][name] = Object.keys(response[0]).map( entry => {
          let data = response[0][entry]
          return this.parseDataEntry(entry, data)
        })
        this.setState({data: DATA[type][name]})
      })
    } else {
      this.setState({data: DATA[type][name]})
    }
  }

  parseDataEntry(entry, data) {
    if (Array.isArray(data)) {
      return this.parseModalArray(entry, data)
    } else if (typeof data === 'object') {
      return this.parseModalObject(entry, data)
    } else if (entry !== 'name') {
      return this.modalLine('', entry, data)
    }
    return ''
  }

  parseModalArray(title, data) {
    console.log("!", title, data)
    return `
      <strong>${columnToProper(title)}</strong>:
      <ul><li>${data.map(entry => {return this.parseModalObject(title, entry, true)}).join('</li><li>')}</li></ul>
      <br />`
  }

  parseModalObject(table, data, nested=false) {
    return Object.keys(data).map(title => {
      return this.modalLine(table, title, data[title], nested)
    }).join('<br />')
  }

  modalLine(table, title, data, nested) {
    console.log(table, title, data)
    if (nested) {
      return data
    }
    if (title === 'name') {
      return `<strong>${columnToProper(table)}</strong>: ${data}`
    }
    return `<strong>${columnToProper(title)}</strong>: ${data}`
  }

  show(name, type, section) {
    let fields = DataSourceTypes[section][type]['modal']
    this.getData(name, type, fields)
    this.setState({
      showModal: true,
      title: name,
    })
  }

  onHide() {
    this.setState({
      showModal: false,
    })
  }

  render() {
    if (!this.state.data) { return null }
    return (
      <Modal show={this.state.showModal} onHide={() => this.onHide()}>
        <Modal.Dialog scrollable={true}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              {Object.keys(this.state.data).map(entry => {
                return <div dangerouslySetInnerHTML={{__html: this.state.data[entry]}}></div>
              })}
            </Modal.Body>
        </Modal.Dialog>
      </Modal>
    )
  }
}
