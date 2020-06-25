import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'

import DataDefinitions from './DataDefinitions'
import DataSourceRequest from './DataSourceRequest'
import {complexToProper, getLocal, setLocal} from './helpers'


export default class DataSourceModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  async getData(name, type, fields) {
    let localData = getLocal(type)
    if (!localData[name]) {
      console.log(`Fetching ${type} ${name}`)
      DataSourceRequest(type, fields, `(name_is: "${name}")`)
      .then(response => {
        localData[name] = this.parseResponseData(response, type)
        setLocal(type, localData)
        this.setState({data: localData[name]})
      })
    } else {
      this.setState({data: localData[name]})
    }
  }

  parseResponseData(response, type) {
    let finalParsedData = []
    let parsedData = Object.keys(response[0]).map( entry => {
      let data = response[0][entry]
      return this.parseDataEntry(type, entry, data)
    })
    parsedData.forEach((entry) => {
      if (Array.isArray(entry)) {
        entry.forEach(item => {
          finalParsedData.push(item)
        })
      } else {
        finalParsedData.push(entry)
      }
    })
    return finalParsedData
  }

  parseDataEntry(table, entry, data) {
    if (Array.isArray(data)) {
      return this.parseModalArray(entry, data)
    } else if (data && typeof data === 'object') {
      return this.parseModalObject(entry, data)
    } else if (entry !== 'name') {
      return this.modalLine('', entry, data)
    } else if (entry === 'name') {
      return this.modalLine(table, entry, data)
    }
    return ''
  }

  parseModalArray(title, data) {
    return `
      <strong>${complexToProper(title)}</strong>:
      <ul><li>${data.map(entry => {return this.parseModalObject(title, entry, true)}).join('</li><li>')}</li></ul>
      `
  }

  parseModalObject(table, data, nested=false) {
    let output = Object.keys(data).map(title => {
      if (nested) {
        return this.modalLine(table, title, data[title], nested)
      }
      return this.parseDataEntry(table, title, data[title])
    })
    return output
  }

  modalLine(table, title, data, nested) {
    if (!data || data === 'null') {
      return ''
    }
    if (nested) {
      return data
    }
    if (title === 'name') {
      return `<strong>${complexToProper(table)}</strong>:<br /> ${data}`
    }
    return `<strong>${complexToProper(title)}</strong>:<br /> ${data}`
  }

  show(name, type, section) {
    let fields = DataDefinitions[section][type]['modal']
    this.getData(name, type, fields).then(() => {
      setTimeout(() => {this.setState({
        showModal: true,
        title: name,
      })},300)
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
      <Modal className="card border-secondary" show={this.state.showModal} onHide={() => this.onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
              {Object.keys(this.state.data).map(entry => {
                let className = 'modalEntry'
                if (
                  this.state.data[entry].includes('escription</strong>') 
                  || this.state.data[entry].includes('<ul>')
                ) {
                  className='modalEntryLong'
                }
                if (this.state.data[entry]) {
                  return <div className={className} dangerouslySetInnerHTML={{__html: this.state.data[entry]}}></div>
                }
                return ''
              })}
          </Modal.Body>
      </Modal>
    )
  }
}
