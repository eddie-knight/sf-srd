import React, {Component} from 'react';

import DataSourceRequest from './DataSourceRequest.js'
import DataSourceTypes from './DataSourceTypes.js'
import DataSourceTabs from './DataSourceTabs.js'
import DataSourceTable from './DataSourceTable.js'

export default class DataSourceContent extends Component {

    state = {
        data: null,
        output: null
    }

    componentDidMount() {
        this.prepare_output()
    }

    async prepare_output() {
        let output = {};
        let typesSections = {}
        Object.keys(DataSourceTypes).forEach(section => {
            Object.keys(DataSourceTypes[section]).forEach(type => {
                typesSections[type] = section
                DataSourceRequest(type, DataSourceTypes[section][type]['table'])
                .then(response => {
                    output[type] = response
                    this.setState({
                        'data': output,
                        'sections': typesSections,
                    })
                });
            })
        })
    }


    render() {
        if (
            !this.state 
            || !this.state.data 
            || !this.state.sections
        ){
            return <div />
        } else if (
            Object.keys(this.state.sections).length !== Object.keys(this.state.data).length
        ) {
            console.log("Loading", (Object.keys(this.state.sections).length - Object.keys(this.state.data).length), "more section(s).")
            return <div />
        }
        let data = this.state.data
        return (<>
            <DataSourceTabs />
            <div id="body" className="tab-content">
                <div className="tab-pane fade show active" id="home">
                    <p>Home.</p>
                </div>
                {Object.keys(data).map(title => (
                    <div className="tab-pane fade" key={title} id={title}>
                        <DataSourceTable section={this.state.sections[title]} title={title} data={data[title]} />
                    </div>
                ))}
            </div>
        </>)
    }
}