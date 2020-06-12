import React, {Component} from 'react';

// import HomePage from './HomeContent.js'
import DataSourceTable from './DataSourceTable.js'
import { columnToProper } from './helpers';
import DataSourceTypes from './DataSourceTypes.js';

class DataSourceMenuTabs extends Component {
    render() {
        return Object.keys(DataSourceTypes).map(section => {
            return (
                <li className="nav-item dropdown show">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href={'#menu-'+section} role="button" aria-haspopup="true" aria-expanded="false">{section}</a>
                    <div className="dropdown-menu" style={{}}>
                        {Object.keys(DataSourceTypes[section]).map(title => (
                            <a className="nav-link" data-toggle="tab" href={'#' + title}>{columnToProper(title)}</a>
                        ))}
                    </div>
                </li>
            )
        })
    }
}

export default class DataSourceTabs extends Component {    
    render() {
        let data = this.props.data
        return (<>
            <ul className="nav nav-tabs" id="header">
            <li className="nav-item">
                <a className="nav-link active" key="home" data-toggle="tab" href="#home">Home</a>
            </li>
            <DataSourceMenuTabs />
            </ul>
            <div id="body" className="tab-content">
                <div className="tab-pane fade show active" id="home">
                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                </div>
                {Object.keys(data).map(title => (
                    <div className="tab-pane fade" key={title} id={title}>
                        <DataSourceTable title={title} data={data[title]} />
                    </div>
                ))}
            </div>
        </>)
    }
}

