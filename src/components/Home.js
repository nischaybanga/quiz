import React from "react";
import Helmet from "react-helmet";
import CubeOutlineIcon from "mdi-react/CubeOutlineIcon";
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Home = () => {
//   const options = [
//   'one', 'two', 'three'
// ];
// const defaultOption = options[0];
  return (
    <React.Fragment>
      <Helmet>
        <title>Quiz App-Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div className="cube">
            <CubeOutlineIcon color="#ffa500" size={128} />
          </div>
          <h1>Quiz App</h1>
          <div className="play-button-container">
            <ul>
              <li>
                <Link to="/play/instructions" className="play-button">
                  Play
                </Link>
              </li>
            </ul>
          </div>
          {/* <p className="home-text">Please Select the topic of quiz</p>
          <Dropdown className="drop-home" options={options}  value={defaultOption} placeholder="Select an option" />; */}
        </section>
      </div>
    </React.Fragment>
  );
};
export default Home;



