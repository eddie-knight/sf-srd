import React, {Component} from 'react';

// import HomePage from './HomeContent.js'
import DataSourceTable from './DataSourceTable.js'
import { properList } from './helpers';

export default class DataSourceTabs extends Component {
    render() {
        let data = this.props.data
        let titles = properList(data)
        return (<>
            <ul className="nav nav-tabs" id="header">
            <li className="nav-item">
                <a className="nav-link active" key="home" data-toggle="tab" href="#home">Home</a>
            </li>
            {Object.keys(titles).map(title => (
                    <li key={title} className="nav-item">
                        <a className="nav-link" data-toggle="tab" href={'#' + title}>{titles[title]}</a>
                    </li>
            ))}
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

