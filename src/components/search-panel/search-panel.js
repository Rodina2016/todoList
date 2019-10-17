import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPannel extends Component {

    state = {
        term: ''
    }

    onSearchItem = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchItem(term);
    }

    render() {
        const searchText = 'Type here to serch';
        return  <input placeholder={searchText} className="form-control search-input" onChange={this.onSearchItem} value={this.state.term}/>
    }
}
