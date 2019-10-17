import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

  state = {
    filter: ''
  }

  filterItems = (e) => {
    const filter = e.target.innerHTML;
    const childArr = e.target.parentNode.childNodes;
    
    childArr.forEach(function(elem){
      elem.classList.remove('btn-info');
      elem.classList.add('btn-outline-secondary');
    });
    e.target.classList.add('btn-info');
    e.target.classList.remove('btn-outline-secondary');
    
    this.setState({filter});
    this.props.onFilter(filter.toLowerCase());
  }

  render () {
    return (
      <div className="btn-group" onClick={this.filterItems}>
        <button type="button"
                className="btn btn-info">All</button>
        <button type="button"
                className="btn btn-outline-secondary">Active</button>
        <button type="button"
                className="btn btn-outline-secondary">Done</button>
      </div>
    );
  }
}
