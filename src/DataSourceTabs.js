import React, {Component} from 'react';

// import HomePage from './HomeContent.js'
import { columnToProper } from './helpers'
import DataSourceTypes from './DataSourceTypes.js'
import StyleSelectionTab from './StyleSelectionTab.js'


class DataSourceMenuTabs extends Component {
    render() {
        return Object.keys(DataSourceTypes).map(section => {
            return (
                <li className="nav-item dropdown show">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href={'#menu-'+section} role="button" aria-haspopup="true" aria-expanded="false">{section}</a>
                    <div className="dropdown-menu" style={{}}>
                        {Object.keys(DataSourceTypes[section]).map(title => (
                            <div><a className="btn btn-link text-left" data-toggle="tab" href={this.props.disabled ? '#loading' : ('#' + title)}>{columnToProper(title)}</a></div>
                        ))}
                    </div>
                </li>
            )
        })
    }
}

export default class DataSourceTabs extends Component {
    render() {
        return (<>
            <ul className="nav nav-tabs" id="header">
            <li className="nav-item">
                <a className="nav-link active" key="home" data-toggle="tab" href="#home">Home</a>
            </li>
            <DataSourceMenuTabs disabled={this.props.disabled} />
            <StyleSelectionTab />
            </ul>
        </>)
    }
}

