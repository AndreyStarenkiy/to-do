import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer';

import './task.css';

export default class Task extends Component {
  state = {
    editing: false,
    timerOnPause: true,
  };

  static defaultProps = {
    item: {
      label: 'Fix label prop',
      done: false,
      timeStamp: new Date(),
    },
    onDeleted: () => {
      throw new Error('onDeleted func was not found');
    },
    toggleDone: () => {
      throw new Error('ToggleDone func was not found');
    },
  };

  static propTypes = {
    item: PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      timeStamp: PropTypes.number,
    }),
    onDeleted: PropTypes.func,
    toggleDone: PropTypes.func,
  };

  updateTimePassed = () => {
    this.forceUpdate();
  };

  handleToggleDone = () => {
    this.setState({ timerOnPause: true });
    this.props.toggleDone();
  };

  handleEditButton = () => {
    this.setState({ editing: true });
  };

  handleEditDone = (e) => {
    if (e.key === 'Enter' && this.state.inputString !== '') {
      this.props.handleEditDone(e.target.value, this.props.item.id);
      this.setState({ editing: false });
    }
  };

  handlePause = () => {
    this.setState({ timerOnPause: true });
  };

  handlePlay = () => {
    this.setState({ timerOnPause: false });
  };

  render() {
    const { editing, timerOnPause } = this.state;
    const { label, done, timeStamp } = this.props.item;
    const { onDeleted } = this.props;

    let descriptionClassNames = 'description';
    let viewClassNames = 'view';
    let itemClassName = '';

    setTimeout(() => this.updateTimePassed(), 5000);

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
          <input className="toggle" type="checkbox" checked={done} onChange={this.handleToggleDone} />
          <div className="label">
            <span className={descriptionClassNames} onClick={this.handleToggleDone}>
              {label}
            </span>
            <div className="view__container">
              <Timer
                time={this.props.item.time}
                saveTime={(time) => this.props.saveTime(time, this.props.item.id)}
                timerOnPause={timerOnPause}
                handlePauseButton={this.handlePause}
                handlePlayButton={this.handlePlay}
              />
              <span className="created">{formatDistanceToNow(timeStamp, { includeSeconds: true })} ago</span>
            </div>
          </div>
          <button className="icon icon-edit" onClick={this.handleEditButton}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <input
            onChange={this.onInputStringChange}
            value={this.state.inputString}
            onKeyDown={this.handleEditDone}
            type="text"
            className="edit"
          ></input>
        ) : null}
      </li>
    );
  }
}
