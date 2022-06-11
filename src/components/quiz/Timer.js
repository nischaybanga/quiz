import React from "react";
import { useState, useEffect } from "react";
const Timer = (props) => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          alert("Time's up!");
          props.endQuiz();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="timer-class">
      {
        <h1>
          {"Time left: "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      }
    </div>
  );
};

export default Timer;
