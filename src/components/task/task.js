import React, { Component } from 'react';

/* const Task = (label) => <span>{label.label}</span>; */

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      done: false,
    };
  }

  onClickDone = () => {
    this.setState({
      done: !this.state.done,
    });
    /* this.setState((state) => {
      console.log(state.done);
    }); */

    /* console.log(`current element id: ${this.props.item.id}`); */
  };

  render() {
    const { label } = this.props.item;
    const { onDeleted } = this.props;
    const { done } = this.state;

    let classNames = 'description';

    if (done) {
      // console.log('done is true');
      classNames += ' completed';
    }

    return (
      <div className="view" key={this.props.id}>
        <input className="toggle" type="checkbox" />
        <label onClick={this.onClickDone}>
          <span className={classNames}>{label}</span>
          <span className="created">created ? seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
