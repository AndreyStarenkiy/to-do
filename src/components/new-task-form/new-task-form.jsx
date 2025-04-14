import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ addingItem }) => {
  const [input, setInput] = useState({
    inputString: '',
    inputMin: '',
    inputSec: '',
  });

  const input1 = useRef(null);

  const input2 = useRef(null);

  const input3 = useRef(null);

  function onInputStringChange(e) {
    setInput({
      ...input,
      inputString: e.target.value,
    });
  }

  function onInputMinChange(e) {
    setInput({
      ...input,
      inputMin: e.target.value,
    });
  }

  function onInputSecChange(e) {
    setInput({
      ...input,
      inputSec: e.target.value,
    });
  }

  function handleKeyDown(e, nextRef) {
    if (e.key === 'Enter') {
      if (input.inputString !== '' && input.inputMin !== '' && input.inputSec !== '') {
        e.preventDefault();
        addingItem(input.inputString, input.inputMin, input.inputSec);
        setInput({
          inputString: '',
          inputSec: '',
          inputMin: '',
        });
      } else {
        e.preventDefault();
        nextRef.current?.focus();
      }
    }
  }

  return (
    <form className="header">
      <h1>todos</h1>
      <input
        ref={input1}
        name="inputString"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputStringChange}
        value={input.inputString}
        onKeyDown={(e) => handleKeyDown(e, input2)}
      />
      <input
        ref={input2}
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onInputMinChange}
        value={input.inputMin}
        onKeyDown={(e) => handleKeyDown(e, input3)}
      ></input>
      <input
        ref={input3}
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onInputSecChange}
        value={input.inputSec}
        onKeyDown={(e) => handleKeyDown(e, input1)}
      ></input>
    </form>
  );
};

export default NewTaskForm;
