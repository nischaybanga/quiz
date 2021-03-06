import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import options from "../../assets/img/options.png";
import answer from "../../assets/img/answer.png";
import fiftyFifty from "../../assets/img/fiftyFifty.png";
import hints from "../../assets/img/hints.png";

const QuizInstructions = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Quiz Instructions- Quiz App</title>
      </Helmet>
      <div className="instructions container">
        <h1>How to Play the Game</h1>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
        <li >
            Make sure you don't switch tab or minimise window during your quiz, if you do so, your quiz will end immediately.
          </li>
          <li>
            The game has a duration of 2 minutes and ends as soon as your time
            elapses.
          </li>
          <li>Each game consists of 15 questions.</li>
          <li>
            Every question contains 4 options.
            <img src={options} alt="Insatquiz options example" />
          </li>
          <li>
            Select the option which best answers the question by clicking (or
            selecting) it.
            <img src={answer} alt="Insatquiz answer example" />
          </li>
          <li>You can only answer each question once.</li>
          <li>
            Each game has 2 lifelines namely:
            <ol type="circle" id="sublist">
              <li>2 50-50 chances</li>
              <li>5 Hints</li>
            </ol>
          </li>
          <li>You can only use one type of lifeline in a given question.</li>
          <li>
            <p>
              Selecting a 50-50 lifeline by clicking the icon{" "}
              <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>{" "}
              will remove 2 wrong answers, leaving the correct answer and one
              wrong answer.
            </p>
            <img src={fiftyFifty} alt="Instaquiz 50-50 answer example" />
          </li>
          <li>
            Using a hint by clicking the icon{" "}
            <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
            will remove one wrong answer leaving two wrong answers and one
            correct answer. You can use as many hints as possible on a single
            question.
            <img src={hints} alt="Instaquiz hints example" />
          </li>
          <li>
            Feel free to quit (or retire from) the game at any time. In that
            case your score will be revealed afterwards.
          </li>
          <li>The timer starts as soon as the game loads.</li>
          <li>Let's do this if you think you've got what it takes?</li>
        </ul>
        <div>
          <span className="left instructions-buttons">
            <Link to="/">No take me back</Link>
          </span>
          <span id="play " className="right instructions-buttons">
            <Link to="/play">Okay, Let's do this!</Link>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};
export default QuizInstructions;
