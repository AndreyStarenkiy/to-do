import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = { inputString: '' };

  static defaultProps = {
    leftCounter: undefined,
    addingItem: () => {
      throw new Error('addingItem func was not found');
    },
  };

  static propTypes = { addingItem: PropTypes.func };

  oninputStringChange = (e) => {
    this.setState({ inputString: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputString !== '') {
      this.props.addingItem(this.state.inputString);
      this.setState({ inputString: '' });
    }
  };

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.oninputStringChange}
          autoFocus
          value={this.state.inputString}
        />
      </form>
    );
  }
}
