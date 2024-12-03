import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

// import TodoHeader from './components/todo-header/todo-header.js';
import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));

export default class ToDoApp extends Component {
  idCounter = 100;

  state = {
    protoList: [
      {
        label: 'Todoshka',
        important: true,
        id: 1,
      },
      {
        label: 'raz dva',
        important: false,
        id: 2,
      },
      {
        label: 'Three',
        important: false,
        id: 3,
      },
      {
        label: 'New one!',
        important: true,
        id: 4,
      },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ protoList }) => {
      const index = protoList.findIndex((el) => el.id === id);
      console.log(index);

      return {
        protoList: protoList.toSpliced(index, 1),
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      label: 'text',
      important: false,
      id: this.idCounter + 1,
    };

    this.setState(({ protoList }) => {
      const newArr = [...protoList, newItem];
      return { protoList: newArr };
    });
  };

  render() {
    return (
      <section id="todoapp" className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList todos={this.state.protoList} onDeleted={this.deleteItem} />
          <Footer addingItem={this.addItem} />
        </section>
      </section>
    );
  }
}

/* const el = (
  <div className='todo'>
    <h1>To-do list!</h1>
    <input placeholder='Start writing...'></input>
    <ul>
      <li>First thing's first</li>
      <li>Last thing's last</li>
    </ul>
  </div>
);
console.log(el);      */

root.render(<ToDoApp />);
