import React, {Component} from 'react';
import Loader from 'react-loader-spinner';

import DataSourceRequest from './DataSourceRequest.js'
import DataDefinitions from './DataDefinitions.js'
import Navbar from './Navbar.js'
import Table from './Table.js'

import {getLocal, setLocal} from './helpers';

export default class PageContent extends Component {
    showTabMap = {}
    loadingTables = false
    loadingData = false
    state = {
        data: {},
        active: '',
        tabContent: {},
    }

    componentDidMount() {
        this.prepareData()
    }

    async getSections() {
        console.log("Setting Section Titles")
        let sections = {}
        Object.keys(DataDefinitions).forEach(section => {
            Object.keys(DataDefinitions[section]).forEach(type => {
                sections[type] = section
            })
        })
        console.log(sections)
        return sections
    }

    getData() {
        let output = this.state.data || {}
        Object.keys(this.sections).forEach(type => {
            this.fetchingData = true
            let section = this.sections[type]
            console.log(section, type)
            // let dataTitle = `data-${section}-${type}`
            if (true) {
                console.log("Fetching data from API:", section, type)
                DataSourceRequest(type, DataDefinitions[section][type]['table'])
                .then(response => {
                    console.log('Data retrieved from API:', type)
                    output[type] = response
                    this.setState({'data': output})
                });
            }
        })
    }

    loadData() {
        this.showTab = this.showTabFunc.bind(this)
        this.loadingData = true
        let localSections = getLocal('ds-sections')
        if (Object.keys(localSections).length === 0) {
            this.getSections().then(response => {
                this.sections = response
                // setLocal('ds-sections', response)
                console.log("!?")
                this.getData()
            })
        }
    }

    prepareData() {
        if (this.state.data && this.sections){
            localStorage.clear()
            // Preparation is complete, return status as 'not loading'
            return false
        }
        if (!this.sections && !this.loadingData) {
            // Page has not yet begun loading data, begin now
            this.loadData()
        }
        // After loading has begun, show spinner
        return (
            <div className="d-flex justify-content-center">
                <Loader type="ThreeDots" color="#1591BD" height="100" width="100" />
            </div>
        )
    }

    showTabFunc(title) {
        this.setState({"active": title})
    }

    async renderTables() {
        let content = {}
        await Object.keys(this.state.data).forEach(title => {
            let classes = `tab-pane fade ${(this.state.active === title) ? 'active' : ''}`
            content[title] = (
                <div className={classes} role="tabpanel" key={title} id={title}>
                    <Table 
                        section={this.sections[title]}
                        title={title}
                        data={this.state.data[title]}
                    />
                </div>
            )
        })
        return content
    }

    renderTabContent() {
        if (
            this.sections
            && !this.loadingTables
            && Object.keys(this.state.data).length === Object.keys(this.sections).length
            ) {
                // Tabs have not yet been rendered, begin now
                this.loadingTables = true
                this.renderTables().then(content => {
                    this.setState({'tabContent': content})
            })
        } else if (Object.keys(this.state.tabContent).length > 0) {
            // Return tabs that have been rendered and saved to runtime memory
            return Object.keys(this.state.tabContent).map(content => {
                return this.state.tabContent[content]
            })
        }
        // If tabs have not finished rendering, show loading icon
        return (
            <div className="d-flex justify-content-center">
                <Loader type="ThreeDots" color="#1591BD" height="100" width="100" />
            </div>
        )
    }

    render() {
        let loading = this.prepareData()
        if (loading !== false) {
            // Render loading icon
            return loading
        }
        let output = this.renderTabContent()
        return (<>
            <Navbar loaded={Object.keys(this.state.data)} active={this.state.active} showTab={this.showTab}/>
            <div id="body" className="tab-content">
                <div className="tab-pane fade show active" role="tabpanel" id="home">
                    <p>Home.</p>
                </div>
                { output }
            </div>
        </>)
    }
}