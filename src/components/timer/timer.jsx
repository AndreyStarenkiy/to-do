import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import './timer.css';

const Timer = ({ timerOnPause: propsTimerOnPause, time: propsTime, saveTime, handlePlay, handlePause }) => {
  const [timerOnPause, setTimerOnPause] = useState(propsTimerOnPause);
  const [timeLeft, setTimeLeft] = useState(propsTime);
  const [myTimeout, setMyTimeout] = useState(0);

  let timeout;
  let button;

  useEffect(
    () => () => {
      setTimeLeft((time) => saveTime(time));
      setTimerOnPause(true);
      clearTimeout(myTimeout);
      clearTimeout(timeout);
    },
    []
  );

  useEffect(() => {
    setTimerOnPause(propsTimerOnPause);
  }, [propsTimerOnPause]);

  const handlePlayButton = () => {
    const subOneSecond = () => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 1000) {
          setMyTimeout(setTimeout(subOneSecond, 1000));
          return prevTimeLeft - 1000;
        }
        setTimerOnPause(true);
        return 0;
      });
    };

    timeout = setTimeout(subOneSecond, 1000);
    setTimerOnPause(false);

    handlePlay();
  };

  const handlePauseButton = () => {
    handlePause();
    clearTimeout(myTimeout);
    setTimerOnPause(true);
  };

  if (timerOnPause) {
    clearTimeout(myTimeout);
    button = <button className="icon icon-play" onClick={handlePlayButton}></button>;
  } else {
    button = <button className="icon icon-pause" onClick={handlePauseButton}></button>;
  }

  return (
    <span className="timer">
      {button}
      {format(timeLeft, 'mm:ss')}
    </span>
  );
};

export default Timer;
