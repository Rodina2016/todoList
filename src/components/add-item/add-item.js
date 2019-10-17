import React, {Component} from 'react';
import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
       this.setState({
           label: e.target.value.toUpperCase()
       })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.OnAddItem(this.state.label);
        this.setState({
            label:''
        })
    }

    render() {
        return (
            <form className="add-item"  onSubmit={this.onSubmit}>

                <input type="text" className="form-control"
                onChange={this.onLabelChange}
                placeholder="What needs to be done"
                value={this.state.label}/>

                <button type="submit"
            className="btn btn-info btn-add">Add item</button>
            </form>
        
        )
    }
}
