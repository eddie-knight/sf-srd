import React, {Component} from 'react';

// import HomePage from './HomeContent.js'
import { complexToProper } from './helpers'
import DataDefinitions from '../DataDefinitions.js'
import StyleSelectionTab from './StyleSelectionTab.js'


class DataSourceMenuTabs extends Component {
    render() {
        return Object.keys(DataDefinitions).map(section => {
            return (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" key={section} href={'#Menu-'+section} role="button" aria-haspopup="true" aria-expanded="false">{section}</a>
                    <div className="dropdown-menu" key={`{$section}-dropdown`} style={{}}>
                        {Object.keys(DataDefinitions[section]).map(title => {
                            let disabled = this.props.loaded.includes(title) ? '' : 'disabled'
                            let active = (title === this.props.active) ? 'active' : ''
                            return <div><a className={`dropdown-item ${disabled} ${active} text-left`} onClick={() => this.props.showTab(title)} data-toggle="tab" href={('#' + title)} role="tab">{complexToProper(title)}</a></div>
                        })}
                    </div>
                </li>
            )
        })
    }
}

export default class Navbar extends Component {
    render() {
        return (<>
            <div className="row">
                <div className="col-sm-10">
                    <ul className="nav nav-tabs" id="tabs">
                        <li className="nav-item">
                            <a className="nav-link active" role="tab" key="home" data-toggle="tab" href="#home">Home</a>
                        </li>
                        <DataSourceMenuTabs active={this.props.active} loaded={this.props.loaded} showTab={this.props.showTab}/>
                    </ul>
                </div>
                <StyleSelectionTab />
            </div>
        </>)
    }
}

