import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    inputString: '',
    inputMin: '',
    inputSec: '',
  };

  static defaultProps = {
    leftCounter: undefined,
    addingItem: () => {
      throw new Error('addingItem func was not found');
    },
  };

  static propTypes = {
    leftCounter: PropTypes.number,
    addingItem: PropTypes.func,
  };

  input1 = createRef();

  input2 = createRef();

  input3 = createRef();

  onInputStringChange = (e) => {
    this.setState({ inputString: e.target.value });
  };

  onInputMinChange = (e) => {
    this.setState({ inputMin: e.target.value });
  };

  onInputSecChange = (e) => {
    this.setState({ inputSec: e.target.value });
  };

  handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      if (this.state.inputString !== '' && this.state.inputMin !== '' && this.state.inputSec !== '') {
        e.preventDefault();
        this.props.addingItem(this.state.inputString, this.state.inputMin, this.state.inputSec);
        this.setState({
          inputString: '',
          inputSec: '',
          inputMin: '',
        });
      } else {
        e.preventDefault();
        nextRef.current?.focus();
      }
    }
  };

  render() {
    return (
      <form className="header">
        <h1>todos</h1>
        <input
          ref={this.input1}
          name="inputString"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onInputStringChange}
          value={this.state.inputString}
          onKeyDown={(e) => this.handleKeyDown(e, this.input2)}
        />
        <input
          ref={this.input2}
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onInputMinChange}
          value={this.state.inputMin}
          onKeyDown={(e) => this.handleKeyDown(e, this.input3)}
        ></input>
        <input
          ref={this.input3}
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onInputSecChange}
          value={this.state.inputSec}
          onKeyDown={(e) => this.handleKeyDown(e, this.input1)}
        ></input>
      </form>
    );
  }
}
