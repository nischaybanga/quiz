import React from "react";
import { useReducer } from "react";
import questionsjson from "./../../questions.json";
import QuestionDisplay from "./QuestionDisplay";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";

const defaultQuestionsState = {
  questions: questionsjson,
  currentQuestionIndex: 0,
  numberOfAnsweredQuestions: 0,
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  hints: 5,
  fiftyFifty: 2,
  usedFiftyFifty: false,
  usedHint: false,
  previousRandomNumber: [],
  answeredQuestions: [],
};

const QuestionManager = () => {
  function questionsReducer(state, action) {
    if (action.type === "CORRECTANS") {
      return {
        questions: state.questions,
        currentQuestionIndex:
          (state.currentQuestionIndex + 1) % state.questions.length,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1,
        score: state.score + 1,
        correctAnswers: state.correctAnswers + 1,
        wrongAnswers: state.wrongAnswers,
        hints: state.hints,
        fiftyFifty: state.fiftyFifty,
        usedFiftyFifty: false,
        usedHint: false,
        previousRandomNumber: [],
        answeredQuestions: state.answeredQuestions.concat(
          state.currentQuestionIndex
        ),
      };
    }
    if (action.type === "NEXTQUESTION") {
      return {
        questions: state.questions,
        currentQuestionIndex:
          (state.currentQuestionIndex + 1) % state.questions.length,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        score: state.score,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hints: state.hints,
        fiftyFifty: state.fiftyFifty,
        usedFiftyFifty: false,
        usedHint: false,
        previousRandomNumber: [],
        answeredQuestions: state.answeredQuestions,
      };
    }
    if (action.type === "PREVQUESTION") {
      return {
        questions: state.questions,
        currentQuestionIndex: state.currentQuestionIndex - 1,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        score: state.score,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hints: state.hints,
        fiftyFifty: state.fiftyFifty,
        usedFiftyFifty: false,
        usedHint: false,
        previousRandomNumber: [],
        answeredQuestions: state.answeredQuestions,
      };
    }
    if (action.type === "WRONGANS") {
      return {
        questions: state.questions,
        currentQuestionIndex:
          (state.currentQuestionIndex + 1) % state.questions.length,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1,
        score: state.score,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers + 1,
        hints: state.hints,
        fiftyFifty: state.fiftyFifty,
        usedFiftyFifty: false,
        usedHint: false,
        previousRandomNumber: [],
        answeredQuestions: state.answeredQuestions.concat(
          state.currentQuestionIndex
        ),
      };
    }
    if (action.type === "HINT") {
      return {
        questions: state.questions,
        currentQuestionIndex: state.currentQuestionIndex,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        score: state.score,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hints: state.hints - 1,
        fiftyFifty: state.fiftyFifty,
        usedFiftyFifty: false,
        usedHint: true,
        previousRandomNumber: state.previousRandomNumber.concat(
          action.randomNumber
        ),
        answeredQuestions: state.answeredQuestions,
      };
    }
    if (action.type === "FIFTYFIFTY") {
      return {
        questions: state.questions,
        currentQuestionIndex: state.currentQuestionIndex,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        score: state.score,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hints: state.hints,
        fiftyFifty: state.fiftyFifty - 1,
        usedFiftyFifty: true,
        usedHint: false,
        previousRandomNumber: [],
        answeredQuestions: state.answeredQuestions,
      };
    }
    if (action.type === "QUIT") {
      return defaultQuestionsState;
    }
    return defaultQuestionsState;
  }
  const [questionsState, dispatchQuestionsAction] = useReducer(
    questionsReducer,
    defaultQuestionsState
  );
  const navigate = useNavigate();
  function hintHandler(x) {
    dispatchQuestionsAction({ type: "HINT", randomNumber: x });
  }
  function correctAnswerHandler() {
    dispatchQuestionsAction({ type: "CORRECTANS" });
  }
  function wrongAnswerHandler() {
    dispatchQuestionsAction({ type: "WRONGANS" });
  }
  function quitHandler() {
    dispatchQuestionsAction({ type: "QUIT" });
  }
  function prevQuestionHandler() {
    dispatchQuestionsAction({ type: "PREVQUESTION" });
  }
  function nextQuestionHandler() {
    dispatchQuestionsAction({ type: "NEXTQUESTION" });
  }
  function fiftyFiftyHandler() {
    dispatchQuestionsAction({ type: "FIFTYFIFTY" });
  }
  const questionContext = {
    questionsState,
    correctAnswer: correctAnswerHandler,
    wrongAnswer: wrongAnswerHandler,
    prevQuestion: prevQuestionHandler,
    nextQuestion: nextQuestionHandler,
    quitQuiz: quitHandler,
    hint: hintHandler,
    fiftyFiftyUsed: fiftyFiftyHandler,
    endQuizDisplay: endingQuizHandler,
  };
  function endingQuizHandler() {
    const quizData = {
      answeredQuestions: questionsState.numberOfAnsweredQuestions,
      totalQuestions: questionsState.questions.length,
      correctAnswers: questionsState.score,
      wrongAnswers: questionsState.wrongAnswers,
      hintsUsed: 5 - questionsState.hints,
      fiftyFiftyUsed: 2 - questionsState.fiftyFifty,
    };
    navigate("/play/quizsummary", { state: quizData });
  }
  return (
    <React.Fragment>
      <Timer endQuiz={endingQuizHandler}></Timer>
      <QuestionDisplay questionsprop={questionContext}></QuestionDisplay>
    </React.Fragment>
  );
};
export default QuestionManager;
