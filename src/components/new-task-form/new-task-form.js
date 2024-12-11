import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label !== '') {
      this.props.addingItem(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    /* this.props; */
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          autoFocus
          value={this.state.label}
        />
      </form>
    );
  }
}
