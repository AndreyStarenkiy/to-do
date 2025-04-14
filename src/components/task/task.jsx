import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer.jsx';

import './task.css';

const Task = ({ onDeleted, item, toggleDone, saveTime, handleEditDone }) => {
  const { label, done, timeStamp } = item;

  let descriptionClassNames = 'description';
  let viewClassNames = 'view';
  let itemClassName = '';

  const [inputString, setInputString] = useState(label);
  const [editing, setEditing] = useState(false);
  const [timerOnPause, setOnPause] = useState(true);
  const [formattedTime, setFormattedTime] = useState(formatDistanceToNow(timeStamp, { includeSeconds: true }));

  const interval = setInterval(() => {
    setFormattedTime(formatDistanceToNow(timeStamp, { includeSeconds: true }));
  }, 5000);

  function handleToggleDone() {
    setOnPause(true);
    toggleDone();
  }

  function handleEdit(e) {
    if (e.key === 'Enter' && inputString !== '') {
      handleEditDone(e.target.value, item.id);
      setEditing(false);
    }
  }

  if (done) {
    descriptionClassNames += ' completed';
  }

  if (editing) {
    viewClassNames += ' hidden';
    itemClassName += 'editing';
  }

  return (
    <li className={itemClassName}>
      <div className={viewClassNames}>
        <input className="toggle" type="checkbox" checked={done} onChange={handleToggleDone} />
        <div className="label">
          <span className={descriptionClassNames} onClick={handleToggleDone}>
            {label}
          </span>
          <div className="view__container">
            <Timer
              time={item.time}
              saveTime={(time) => saveTime(time, item.id)}
              timerOnPause={timerOnPause}
              handlePause={() => setOnPause(true)}
              handlePlay={() => setOnPause(false)}
            />
            <span className="created">{formattedTime} ago</span>
          </div>
        </div>
        <button className="icon icon-edit" onClick={() => setEditing(true)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing ? (
        <input
          onChange={(e) => setInputString(e.target.value)}
          value={inputString}
          onKeyDown={handleEdit}
          type="text"
          className="edit"
          autoFocus
        ></input>
      ) : null}
    </li>
  );
};

export default Task;
