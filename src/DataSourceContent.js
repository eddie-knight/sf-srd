import React, {Component} from 'react';

import DataSourceRequest from './DataSourceRequest.js'
import DataSourceTypes from './DataSourceTypes.js'
import DataSourceTabs from './DataSourceTabs.js'

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
        Object.keys(DataSourceTypes).forEach(type => {
            DataSourceRequest(type, DataSourceTypes[type])
                .then(response => {
                    output[type] = response
                    this.setState({'output': output})
                });
        })
    }


    render() {
        if (this.state === {} || !this.state.output) { return <div />}
        return (
            <DataSourceTabs data={this.state.output} />
        )
    }
}