import React, { Component } from "react";
import "./ToDoList.css";
import TodoItems from "./TodoItems";
import { FaPlus } from 'react-icons/fa';
import Typical from 'react-typical'


export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
          };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
      }
  
      addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
              text: this._inputElement.value,
              key: Date.now()
            };
         
            this.setState((prevState) => {
              return { 
                items: prevState.items.concat(newItem) 
              };
            });
           
            this._inputElement.value = "";
          }
           
          console.log(this.state.items);
             
          e.preventDefault();
     }
    
     deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
       
        this.setState({
          items: filteredItems
        });
      }


    render() {
    return (
      <div className="todoListMain">
        <div className="header">
        <Typical
        steps={['To Do Tasks', 20000, '']}
        loop={Infinity}
        wrapper="p"
        className="todoTitle"
      />
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} placeholder="...new task">
            </input>
            <button type="submit"><FaPlus /></button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
        delete={this.deleteItem}/>
      </div>
    );
  }
}
