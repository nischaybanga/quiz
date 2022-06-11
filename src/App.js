import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuestionManager from "./components/quiz/QuestionManager";
import QuizInstructions from "./components/quiz/QuizInstructions";
import QuizSummary from "./components/quiz/QuizSummary";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/play/instructions"
          exact
          element={<QuizInstructions />}
        ></Route>
        <Route path="/play" exact element={<QuestionManager />}></Route>
        <Route path="/play/quizsummary" exact element={<QuizSummary/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
