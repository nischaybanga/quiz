import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const QuizSummary = (props) => {
  const location = useLocation();
  const reportCard = location.state;
  let score = (reportCard.correctAnswers / reportCard.totalQuestions) * 100;
  let remark;
  if (score <= 30) {
    remark = "You need more practice";
  } else if (score > 30 && score <= 50) {
    remark = "Better luck next time";
  } else if (score <= 70 && score > 50) {
    remark = "You can do better";
  } else if (score >= 71 && score <= 84) {
    remark = "You did great!";
  } else {
    remark = "You're an absolute genius!";
  }
  let stats;
  if (reportCard !== null) {
    stats = (
      <React.Fragment>
        <Helmet>
          <title>Quiz Summary</title>
        </Helmet>
        <div style={{ textAlign: "center" }}>
          <span className="mdi mdi-check-circle-outline success-icon"></span>
        </div>
        <h1>Congratulations you made it!</h1>
        <div className="container stats">
          <h4>{remark}</h4>
          <h2>Your Score: {score.toFixed(0)}&#37;</h2>
          <span className="stat left">Total Number of Questions: </span>
          <span className="right">{reportCard.totalQuestions}</span>
          <br />
          <span className="stat left">Number of attempted questions: </span>
          <span className="right">{reportCard.answeredQuestions}</span>
          <br />
          <span className="stat left">Number of Correct Answers: </span>
          <span className="right">{reportCard.correctAnswers}</span>
          <br />
          <span className="stat left">Number of Wrong Answers: </span>
          <span className="right">{reportCard.wrongAnswers}</span>
          <br />
          <span className="stat left">Hints used: </span>
          <span className="right">{reportCard.hintsUsed} out of 5</span>
          <br />
          <span className="stat left">50-50 used: </span>
          <span className="right">{reportCard.fiftyFiftyUsed} out of 2</span>
          <br />
        </div>
        <section>
          <ul>
            <li>
              <Link to="/play">Play Again</Link>
            </li>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      </React.Fragment>
    );
  } else {
    stats = stats = (
      <React.Fragment>
        <section>
          <h1 className="no-stats">No Statistics Available</h1>
          <ul>
            <li>
              <Link to="/play">Play</Link>
            </li>
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      </React.Fragment>
    );
  }
  return <div className="quiz-summary">{stats}</div>;
};
export default QuizSummary;
