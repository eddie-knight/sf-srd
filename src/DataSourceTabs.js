import React, {Component} from 'react';

// import HomePage from './HomeContent.js'
import DataSourceTable from './DataSourceTable.js'
import { properList } from './helpers';

export default class DataSourceTabs extends Component {
    render() {
        let data = this.props.data
        let titles = properList(this.props.data)
        return (<>
            <ul class="nav nav-tabs" id="header">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            {Object.keys(titles).map(title => (
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href={'#' + title}>{titles[title]}</a>
                    </li>
            ))}
            </ul>
            <div id="body" class="tab-content">
                <div class="tab-pane fade show active" id="home">
                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                </div>
                {Object.keys(data).map(title => (
                    <div class="tab-pane fade" id={title}>
                        <DataSourceTable data={data[title]} />
                    </div>
                ))}
            </div>
        </>)
    }
    // render() {
    //     let data = this.props.data
    //     return (
    //         <>
    //         <ul class="nav nav-tabs">
    //             <li class="nav-item">
    //                 <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
    //             </li>
    //             {Object.keys(data).map(title => (
    //                 <li class="nav-item">
    //                     <a class="nav-link active" data-toggle="tab" href={'#' + title}>{title}</a>
    //                 </li>
    //             ))}
    //         </ul>
    //         <div id="dataSourceContent" class="tab-content">
    //             <div class="tab-pane fade show active" id="home">
    //                 <div />
    //                 {/* <HomeContent /> */}
    //             </div>
    //             {Object.keys(data).map(title => (
    //             <div class="tab-pane fade" id={title}>
    //                 <h2>{title}</h2>
    //             </div>
    //             ))}
    //         </div>
    //         </>
    //     )
    // }
}

