import React, { Component } from 'react';

/* const Task = (label) => <span>{label.label}</span>; */

export default class Task extends Component {
  render() {
    const { label, done } = this.props.item;
    const { onDeleted, toggleDone } = this.props;

    let classNames = 'description';

    if (done) {
      // console.log('done is true');
      classNames += ' completed';
    }

    return (
      <div className="view" key={this.props.id}>
        <input className="toggle" type="checkbox" />
        <label onClick={toggleDone}>
          <span className={classNames}>{label}</span>
          <span className="created">created ? seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
