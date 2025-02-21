import React, { Component } from 'react';
import { format } from 'date-fns';

import './timer.css';

export default class Timer extends Component {
  state = {
    timerOnPause: this.props.timerOnPause,
    time: this.props.time,
  };

  timerInterval;

  componentWillUnmount() {
    this.props.saveTime(this.state.time);
    this.setState({ timerOnPause: true });

    clearTimeout(this.timerInterval);
  }

  handlePlayButton = () => {
    const subOneSecond = () => {
      const minusSecond = this.state.time - 1000;

      if (this.state.time > 1000) {
        this.setState({
          time: minusSecond,
          timerOnPause: false,
        });
      } else {
        this.setState({ timerOnPause: true });
        clearTimeout(this.timerInterval);
      }

      this.timerInterval = setTimeout(subOneSecond, 1000);
    };

    setTimeout(subOneSecond, 1000);

    this.props.handlePlayButton();
  };

  handlePauseButton = () => {
    clearTimeout(this.timerInterval);
    this.props.handlePauseButton();
  };

  render() {
    const { timerOnPause } = this.props;
    let button;

    if (timerOnPause) {
      clearTimeout(this.timerInterval);
      button = <button className="icon icon-play" onClick={this.handlePlayButton}></button>;
    } else {
      button = <button className="icon icon-pause" onClick={this.handlePauseButton}></button>;
    }

    return (
      <span className="timer">
        {button}
        {format(this.state.time, 'mm:ss')}
      </span>
    );
  }
}
