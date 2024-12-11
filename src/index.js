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
      this.createTodoItem('Todoshka'),
      this.createTodoItem('raz dva'),
      this.createTodoItem('Three'),
      this.createTodoItem('New one!'),
    ],
    filterMode: 'all',
  };

  createTodoItem(label) {
    this.idCounter += 1;
    return {
      label,
      done: false,
      id: this.idCounter,
      active: true,
    };
  }

  deleteItem = (id) => {
    this.setState(({ protoList }) => {
      const index = protoList.findIndex((el) => el.id === id);
      /* console.log(index); */

      return {
        protoList: protoList.toSpliced(index, 1),
      };
    });
  };

  selectFilter = (mode) => {
    this.setState({ filterMode: mode });
    /* this.setState((state) => {
      console.log('пожалуйста сработай');
      console.log(state);
    }); */
  };

  onToggleDone = (id) => {
    this.setState(({ protoList }) => {
      const index = protoList.findIndex((el) => el.id === id);

      const oldItem = protoList[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = protoList.toSpliced(index, 1, newItem);
      console.log(`Toggle done ${id}`);
      return { protoList: newArr };
    });
  };

  addItem = (text) => {
    this.idCounter += 1;
    const newItem = {
      label: text,
      done: false,
      id: this.idCounter,
      active: true,
    };

    this.setState(({ protoList }) => {
      const newArr = [...protoList, newItem];
      return { protoList: newArr };
    });
  };

  clearCompleted = () => {
    this.setState(({ protoList }) => {
      const newArr = protoList.filter((item) => item.done === false);
      return { protoList: newArr };
    });
  };

  render() {
    const doneCounter = this.state.protoList.filter((el) => el.done === true).length;
    const leftCounter = this.state.protoList.length - doneCounter;
    console.log(`we got ${leftCounter} elements left`);

    return (
      <section id="todoapp" className="todoapp">
        <NewTaskForm addingItem={this.addItem}/>
        <section className="main">
          <TaskList
            todos={this.state.protoList}
            onDeleted={this.deleteItem}
            toggleDone={this.onToggleDone}
            filterMode={this.state.filterMode}
          />
          <Footer leftCounter={leftCounter}
                  selectFilter={(mode) => this.selectFilter(mode)}
                  filterMode={this.state.filterMode}
                  clearCompleted={this.clearCompleted} />
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
