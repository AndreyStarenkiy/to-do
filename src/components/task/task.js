import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
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

  render() {
    const { label, done, timeStamp } = this.props.item;
    const { onDeleted, toggleDone } = this.props;

    let classNames = 'description';

    setTimeout(() => this.updateTimePassed(), 5000);

    if (done) {
      classNames += ' completed';
    }

    return (
      <div className="view" key={this.props.id}>
        <input className="toggle" type="checkbox" checked={done} onChange={toggleDone} />
        <label onClick={toggleDone}>
          <span className={classNames}>{label}</span>
          <span className="created">created {formatDistanceToNow(timeStamp, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
