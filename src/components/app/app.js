import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPannel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

export default class App extends Component {

    constructor() {
        super();

        this.maxId = 100;

        this.state = {
            todoData :[
                this.createToDoItem('Drink coffe'),
                this.createToDoItem('Make Awesome App'),
                this.createToDoItem('Have a lunch'),
            ],
            term: '',
            filter: '', //active, all, done
        }

        this.deleteItem = (id) => {
            this.setState((state) => {
                
                const idx = state.todoData.findIndex((el) => el.id === id);

                const before = state.todoData.slice(0, idx);
                const after = state.todoData.slice(idx + 1);
                const newArr = [...before,...after];

                return {
                    todoData: newArr
                }

            })
        }

        this.addItem = (text) => {
            const newItem = this.createToDoItem(text);

            this.setState((state) => {
                const newArr = [...state.todoData, newItem];

                return {
                    todoData: newArr
                }
            });

        }
        this.onToggleImportant = (id) => {
            this.setState((state) => {
        
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'important')
                }
            });
        }

        this.onToggleDone = (id) => {
            this.setState((state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'done')
                }
            });
        }

        this.onSearchItem = (term) => {
            this.setState({term});
        }

        this.filterItemArr = (filter) => {
            this.setState({filter});
        }

    }

    createToDoItem(label) {
        return {
            label: label, 
            important: false,
            done: false,
            search: false,
            id: this.maxId++
        }
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

                const oldItem = arr[idx];
                const newItem = {...oldItem, [propName]:!oldItem[propName]};

                const before = arr.slice(0, idx);
                const after = arr.slice(idx + 1);
        
                return [...before, newItem, ...after];
    }

    search(arr, term) {
        return arr.filter((item) => {
            return item.label.toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(arr, filter) {
        switch(filter){
            case 'all':
                    return arr;
            case 'active':
                    return arr.filter((item) =>  !item.done);
            case 'done':
                    return arr.filter((item) =>  item.done);
            default:
                return arr;
        }
    
    }

    

    render() {
        const doneCount = this.state.todoData
                            .filter((el) => el.done).length;

        const todoCount = this.state.todoData.length - doneCount;

        const visibleItem = this.filter(this.search(this.state.todoData, this.state.term, this.state.filter), this.state.filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={doneCount} done={todoCount}/>
                <div className="top-panel d-flex">
                    <SearchPannel onSearchItem={this.onSearchItem}/>
                    <ItemStatusFilter onFilter={this.filterItemArr} />
                </div>
    
                <ToDoList todos={visibleItem}
                OnDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
                <AddItem  OnAddItem = {this.addItem}/>
            </div>
        )
    }
}

