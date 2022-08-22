import React from "react";
import { Helmet } from "react-helmet";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";


const QuestionDisplay = (props) => {

  //variables and state initialisation

  const question = props.questionsprop.questionsState;
  const currentQuestionIndex = question.currentQuestionIndex;
  const currentQuestion = question.questions[currentQuestionIndex];
  const totalNumberOfQuestions = question.questions.length;
  const navigate = useNavigate();

  //showing options after lifeline

  const showOptions = () => {
    const options = document.querySelectorAll(".option");  //select by class, all options have this class
    options.forEach((option) => {
      option.style.visibility = "visible";
    });
  };

  //handling back option

  // window.onbeforeunload =()=>{
  //   if(window.location.pathname==='/play'){
  //     if (
  //       window.confirm(
  //         "Are you sure you want to go back? All the progress will be lost."
  //       )){
  //         showOptions();
  //         navigate("/");
  //         props.questionsprop.quitQuiz();
  //       }
  //   }
  // };

  //handling tab switch
  document.onvisibilitychange = () => {
    if(window.location.pathname==='/play'){
      
      showOptions();
      //navigate("/");
      props.questionsprop.endQuizDisplay();
      alert("You switched tab, hence your quiz has ended.")
    }
    
  };

  //handling quit option click

  const quitOptionClick = () => {
    if (
      window.confirm(
        "Are you sure you want to quit? All the progress will be lost."
      )
    ) {
      showOptions();
      navigate("/");
      props.questionsprop.quitQuiz();
    }
  };

  //handling next option click

  const nextOptionClick = () => {
    showOptions();
    if (currentQuestionIndex !== totalNumberOfQuestions - 1) {
      props.questionsprop.nextQuestion();
    } else {
     
      M.toast({
        html: "This is the last question",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  };
  const prevOptionClick = () => {
    showOptions();
    if (currentQuestionIndex !== 0) {
      props.questionsprop.prevQuestion();
    } else {
      
      M.toast({
        html: "This is the first question",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  };

  //handle hint click

  const handleHintClick = (e) => {

    //so that a person doesn't waste hint on already answered question
    if (question.answeredQuestions.includes(currentQuestionIndex)) {
      M.toast({
        html: "Question already answered!",
        classes: "toast-valid",
        displayLength: 1500,
      });
      return;
    }
    if (question.hints > 0 && question.usedFiftyFifty === false) {
      let options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() ===
          currentQuestion.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        //console.log(randomNumber);
        if (
          randomNumber !== indexOfAnswer &&
          !question.previousRandomNumber.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              props.questionsprop.hint(randomNumber);
            }
          });
          break;
        }
        if (question.previousRandomNumber.length >= 3) {
          break;
        }
      }
    } else if (question.usedFiftyFifty === true) {
      M.toast({
        html: "Cannot use hints with 50-50",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    } else {
      M.toast({
        html: "No more hints available!",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  };

  //handling option click 

  const handleOptionClick = (e) => {
    showOptions();
    const answerClicked = e.target.innerHTML;
    if (question.answeredQuestions.includes(currentQuestionIndex)) {
      M.toast({
        html: "Question already answered!",
        classes: "toast-valid",
        displayLength: 1500,
      });
      return;
    }
    if (answerClicked.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      M.toast({
        html: "Correct Answer!",
        classes: "toast-valid",
        displayLength: 1500,
      });
      props.questionsprop.correctAnswer();
    } else {
      M.toast({
        html: "Wrong Answer!",
        classes: "toast-invalid",
        displayLength: 1500,
      });
      props.questionsprop.wrongAnswer();
    }
  };

  //handling 50-50

  const handleFiftyFiftyClick = () => {
    if (question.answeredQuestions.includes(currentQuestionIndex)) {
      M.toast({
        html: "Question already answered!",
        classes: "toast-valid",
        displayLength: 1500,
      });
      return;
    }
    if (
      question.fiftyFifty > 0 &&
      !question.usedFiftyFifty &&
      question.usedHint === false
    ) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() ===
          currentQuestion.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (randomNumbers.length < 2) {
            if (
              !randomNumbers.includes(randomNumber) &&
              !randomNumbers.includes(indexOfAnswer)
            ) {
              randomNumbers.push(randomNumber);
              count++;
            } else {
              while (true) {
                const newRandomNumber = Math.round(Math.random() * 3);
                if (
                  !randomNumbers.includes(newRandomNumber) &&
                  newRandomNumber !== indexOfAnswer
                ) {
                  randomNumbers.push(newRandomNumber);
                  count++;
                  break;
                }
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      props.questionsprop.fiftyFiftyUsed();
    } else if (question.usedHint === true) {
      M.toast({
        html: "Cannot use 50-50 with hint",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    } else if (question.fiftyFifty > 0 && question.usedFiftyFifty) {
      M.toast({
        html: "Only 1 fifty-fity per question!",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    } else {
      M.toast({
        html: "No fifty-fifty lifelines left!",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  };

  // handling submit

  function submitButtonHandler() {
    if (
      window.confirm(
        `Are you sure you want to submit? You have ${
          totalNumberOfQuestions - question.answeredQuestions.length
        } unanswered questions.`
      )
    )
      props.questionsprop.endQuizDisplay();
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>Quiz</title>
      </Helmet>
      <div className="questions">
        <h2>Question</h2>
        <div className="lifeline-container">
          <p>
            <span
              onClick={handleFiftyFiftyClick}
              className="mdi mdi-set-center mdi-24px lifeline-icon"
            ></span>
            <span className="lifeline">{question.fiftyFifty}</span>
          </p>
          <p>
            <span
              onClick={handleHintClick}
              className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
            ></span>
            <span className="lifeline">{question.hints}</span>
          </p>
        </div>
        <div className="timer-container">
          <p>
            <span className="left">
              {currentQuestionIndex + 1} of {totalNumberOfQuestions}
            </span>
          </p>
        </div>
        <h5>{currentQuestion.question}</h5>
        <div className="options-container">
          <p className="option" onClick={handleOptionClick}>
            {currentQuestion.optionA}
          </p>
          <p className="option" onClick={handleOptionClick}>
            {currentQuestion.optionB}
          </p>
        </div>
        <div className="options-container">
          <p className="option" onClick={handleOptionClick}>
            {currentQuestion.optionC}
          </p>
          <p className="option" onClick={handleOptionClick}>
            {currentQuestion.optionD}
          </p>
        </div>
        <div className="button-container">
          <button className="button" onClick={prevOptionClick}>Previous</button>
          <button className="button" onClick={nextOptionClick}>Next</button>
          <button className="button" onClick={quitOptionClick}>Quit</button>
          <button className="button" onClick={submitButtonHandler}>Submit</button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default QuestionDisplay;
