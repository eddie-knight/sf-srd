import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'

import DataDefinitions from '../DataDefinitions'
import DataSourceRequest from './DataSourceRequest'
import {complexToProper, getLocal, setLocal} from './helpers'


class ModalABC extends Component {

  parseResponseData(response, type) {
    let output = []
    let parsedData = Object.keys(response[0]).map( entry => {
      let data = response[0][entry]
      return this.parseDataEntry(type, entry, data)
    })
    parsedData.forEach((entry) => {
      if (Array.isArray(entry)) {
        entry.forEach(item => {
          output.push(item)
        })
      } else {
        output.push(entry)
      }
    })
    return output
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

  async getData(name, type, fields) {
    let localData = getLocal(type)
    if (!localData[name]) {
      console.log(`Fetching ${type} ${name}`)
      DataSourceRequest(type, fields, `(name_is: "${name}")`)
      .then(response => {
        console.log(response)
        localData[name] = this.parseResponseData(response, type)
        setLocal(type, localData)
        this.setState({data: localData[name]})
        console.log(localData[name])
      })
    } else {
      this.setState({data: localData[name]})
    }
  }
}


export default class DataSourceModal extends ModalABC {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      standardContentActive: true,
    }
  }

  show(name, type, section) {
    let fields = DataDefinitions[section][type]['modal']
    let modalTabs = DataDefinitions[section][type]['modalTabs'] || null
    this.getData(name, type, fields).then(() => {
      setTimeout(() => {this.setState({
        showModal: true,
        type: type,
        section: section,
        title: name,
        modalTabs: modalTabs,
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
        <ModalSection
          name={this.state.title}
          type={this.state.type}
          section={this.state.section}
          tabs={this.state.modalTabs}
          data={this.state.data}
        />
      </Modal>
    )
  }
}

class ModalSection extends ModalABC {
  state = {
    data: {},
    output: undefined,
  }

  render() {
    return (<>
      { this.modalHeader() }
      <Modal.Body scrollable="true">
        { this.modalTabs() }
      </Modal.Body>
    </>)
  }

  componentDidMount() {
    this.prepareMainContent()
    if (this.props.tabs) {
      this.prepareNestedContent()
    }
    console.log(this.state.data)
  }

  modalTabs() {
    if (!this.props.tabs) {
      return this.state.output
    }
    return (<>
      <div className="col-sm-12">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" onClick={() => this.setState({ 'output': this.state.data['main'] })} href={'#' + this.props.name}>Base Data</a>
          </li>
          <li className="nav-item">
            { Object.keys(this.props.tabs).map(tab => {
              return <a className="nav-link" data-toggle="tab" onClick={() => this.setState({ 'output': this.state.data[tab] })} href={"#data-"+tab}>{complexToProper(tab)}</a>
            })}
          </li>
        </ul>
      </div>
      { this.state.output }
    </>)
  }

  modalHeader() {
    return (
      <Modal.Header closeButton>
        <Modal.Title>{this.props.name}</Modal.Title>
      </Modal.Header>
      )
    }


  prepareNestedContent() {
    let output = this.state.data
    Object.keys(this.props.tabs).forEach(tab => {
      if (!output[tab]) {
        console.log(
          this.props.name,
          this.props.type,
          {tab: DataDefinitions[this.props.section][this.props.type]['modalTabs']},
        )
        this.getData(
          this.props.name,
          this.props.type,
          {tab: DataDefinitions[this.props.section][this.props.type]['modalTabs']},
        )
      }
    })
    this.setState({ 'data': output })
  }

  prepareMainContent() {
    if (!this.state.data['main']) {
      let data = this.prepareEntry('main', this.props.data)
      this.setState({
        'data': data,
        'output': data['main']
      })
    }
  }

  prepareEntry(name, data) {
    let output = this.state.data
    if (!output[name]) {
        output[name] = (
        Object.keys(data).map(i => {
          let className = 'modalEntry'
          let entry = data[i]
          if (
            entry.includes('escription</strong>')
            || entry.includes('<ul>')
            || entry.length > 80
          ) {
            className='modalEntryLong'
          }
          if (entry) {
            return <div className={className} dangerouslySetInnerHTML={{__html: entry}}></div>
          }
          return ''
        })
      )
    }
    return output
  }
}
