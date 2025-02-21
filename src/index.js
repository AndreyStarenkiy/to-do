import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import NewTaskForm from './components/new-task-form/new-task-form';
import TaskList from './components/task-list/task-list';
import Footer from './components/footer/footer';
import Task from './components/task/task';

const root = ReactDOM.createRoot(document.querySelector('.wrapper'));

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
      timeStamp: Date.now(),
      time: 600000,
    };
  }

  addItem = (text, min = null, sec = null) => {
    this.idCounter += 1;
    const newItem = {
      label: `${text}`,
      done: false,
      id: this.idCounter,
      active: true,
      timeStamp: Date.now(),
      time: min * 60 * 1000 + sec * 1000,
    };

    this.setState(({ protoList }) => {
      const newArr = [newItem, ...protoList];
      return { protoList: newArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ protoList }) => {
      const index = protoList.findIndex((el) => el.id === id);

      return { protoList: protoList.toSpliced(index, 1) };
    });
  };

  selectFilter = (mode) => {
    this.setState({ filterMode: mode });
  };

  onToggleDone = (id) => {
    this.setState(({ protoList }) => {
      const index = protoList.findIndex((el) => el.id === id);

      const oldItem = protoList[index];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };

      const newArr = protoList.toSpliced(index, 1, newItem);
      return { protoList: newArr };
    });
  };

  clearCompleted = () => {
    this.setState(({ protoList }) => {
      const newArr = protoList.filter((item) => item.done === false);
      return { protoList: newArr };
    });
  };

  handleEditDone = (input, itemId) => {
    const index = this.state.protoList.findIndex((obj) => obj.id === itemId);
    const arr = this.state.protoList;

    arr[index].label = input;

    this.setState({ protoList: arr });
  };

  saveTime = (time, itemId) => {
    const index = this.state.protoList.findIndex((obj) => obj.id === itemId);
    const arr = this.state.protoList;
    arr[index].time = time;
    this.setState({ protoList: arr });
  };

  render() {
    const doneCounter = this.state.protoList.filter((el) => el.done === true).length;
    const leftCounter = this.state.protoList.length - doneCounter;
    const { filterMode, protoList } = this.state;

    const elementsToRender = protoList.map((item) => {
      const condition =
        filterMode === 'all' || (filterMode === 'active' && !item.done) || (filterMode === 'completed' && item.done);

      if (condition) {
        return (
          <Task
            key={item.id}
            item={item}
            onDeleted={() => {
              this.deleteItem(item.id);
            }}
            toggleDone={() => {
              this.onToggleDone(item.id);
            }}
            handleEditDone={this.handleEditDone}
            saveTime={this.saveTime}
          />
        );
      }

      return undefined;
    });

    return (
      <section id="todoapp" className="todoapp">
        <NewTaskForm addingItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.state.protoList}
            onDeleted={this.deleteItem}
            toggleDone={this.onToggleDone}
            filterMode={this.state.filterMode}
            elementsToRender={elementsToRender}
          />
          <Footer
            leftCounter={leftCounter}
            selectFilter={(mode) => this.selectFilter(mode)}
            filterMode={this.state.filterMode}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

root.render(<ToDoApp />);
