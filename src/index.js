import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import NewTaskForm from './components/new-task-form/new-task-form.jsx';
import TaskList from './components/task-list/task-list.jsx';
import Footer from './components/footer/footer.jsx';
import Task from './components/task/task.jsx';

const root = ReactDOM.createRoot(document.querySelector('.wrapper'));

const ToDoApp = () => {
  let idCounter = 100;
  let bufferProtoList;

  function createTodoItem(label) {
    idCounter += 1;
    return {
      label,
      done: false,
      id: idCounter,
      active: true,
      timeStamp: Date.now(),
      time: 600000,
    };
  }

  const [protoList, setProtoList] = useState([
    createTodoItem('Todoshka'),
    createTodoItem('raz dva'),
    createTodoItem('Three'),
    createTodoItem('New one!'),
  ]);
  const [filterMode, setFilterMode] = useState('all');
  const [counters, setCounters] = useState({
    doneCounter: null,
    leftCounter: 4,
  });

  useEffect(() => {
    const done = protoList.reduce((acc, current) => (current.done === true ? acc + 1 : acc), 0);
    setCounters({
      doneCounter: done,
      leftCounter: protoList.length - done,
    });
  }, [protoList]);

  const addItem = (text, min = null, sec = null) => {
    idCounter += 1;
    const newItem = {
      label: `${text}`,
      done: false,
      id: idCounter,
      active: true,
      timeStamp: Date.now(),
      time: min * 60 * 1000 + sec * 1000,
    };

    setProtoList([newItem, ...protoList]);
  };

  const deleteItem = (id) => {
    setProtoList(() => {
      const index = protoList.findIndex((el) => el.id === id);
      bufferProtoList = protoList.toSpliced(index, 1);
      return [...bufferProtoList];
    });
  };

  const selectFilter = (mode) => {
    setFilterMode(mode);
  };

  function onToggleDone(id) {
    setProtoList(() => {
      const index = protoList.findIndex((el) => el.id === id);

      const oldItem = protoList[index];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };

      const newArr = protoList.toSpliced(index, 1, newItem);
      return newArr;
    });
  }

  const clearCompleted = () => {
    setProtoList((list) => {
      const newArr = list.filter((item) => item.done === false);
      return newArr;
    });
  };

  const handleEditDone = (input, itemId) => {
    const index = protoList.findIndex((obj) => obj.id === itemId);
    const arr = protoList;

    arr[index].label = input;

    return arr;
  };

  const saveTime = (time, itemId) => {
    setProtoList((list) => {
      const index = list.findIndex((obj) => obj.id === itemId);

      if (index === -1) return list;

      const arr = [...list];
      arr[index].time = time;
      return arr;
    });
  };

  const elementsToRender = protoList.map((item) => {
    const condition =
      filterMode === 'all' || (filterMode === 'active' && !item.done) || (filterMode === 'completed' && item.done);

    if (condition) {
      return (
        <Task
          key={item.id}
          item={item}
          onDeleted={() => {
            deleteItem(item.id);
          }}
          toggleDone={() => {
            onToggleDone(item.id);
          }}
          handleEditDone={handleEditDone}
          saveTime={saveTime}
        />
      );
    }

    return undefined;
  });

  return (
    <section id="todoapp" className="todoapp">
      <NewTaskForm addingItem={addItem} />
      <section className="main">
        <TaskList
          todos={protoList}
          onDeleted={deleteItem}
          toggleDone={onToggleDone}
          filterMode={filterMode}
          elementsToRender={elementsToRender}
        />
        <Footer
          leftCounter={counters.leftCounter}
          selectFilter={(mode) => selectFilter(mode)}
          filterMode={filterMode}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

root.render(<ToDoApp />);
