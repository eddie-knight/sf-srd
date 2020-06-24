import React, {Component} from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
const STYLES = ['Lux', 'Minty', 'Sketchy', 'Slate', 'Solar', 'Superhero', 'Yeti']

export default class StyleSelectionTab extends Component {
    styleButton(title) {
        return <button className="btn btn-link" onClick={() => this.changeStyle(title)}>{title}</button>
    }

    changeStyle(title) {
        cookies.set('layout', title)
        window.location.reload(false);
    }
    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href='#style-change' role="button" aria-haspopup="true" aria-expanded="false">Style</a>
                <div className="dropdown-menu" style={{}}>
                    {STYLES.map(title => (
                        <div>{this.styleButton(title)}</div>
                    ))}
                </div>
            </li>
        )
    }
}