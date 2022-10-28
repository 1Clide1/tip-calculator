import React, { useState, useEffect } from "react";
// import Auth from "../utils/auth";
// import graphql
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { GET_TIPS } from "../utils/queries";
// import css
import "./profile-page.css";
// import react loader
import { Grid } from "react-loader-spinner";
// import { removeBookId } from '../utils/localStorage';

const ProfilePage = () => {
  // grabbing the user data
  const { loading, data } = useQuery(QUERY_ME);
  // add some state to specify loading time
  const [delay, setDelay] = useState(false);
  // grabbing the tips from the user data
  const { loading: loadingTips, data: tipData } = useQuery(GET_TIPS);
  // setting the userdata as a variable or an empty object if there is nothing
  const userData = data?.me || {};
  // now grabbing the tips data
  const tipsData = tipData?.tips.tipHistory || {};
  // mapping out the tips data to display the tip history
  const tipHistory = Object.values(tipsData).map((tip) => tip.tip);

  // function to get the most frequent number
  const modeString = (array) => {
    // if the array has nothing then return nothing
    if (array.length <= 1) return null;

    let modeMap = {},
      maxEl = array[0],
      maxCount = 1;

    for (let i = 0; i < array.length; i++) {
      let el = array[i];

      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;

      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
      // else if (modeMap[el] === maxCount) {
      //   maxEl += "&" + el;
      //   maxCount = modeMap[el];
      // }
    }
    return maxEl;
  };

  // this is a use effect to turn the state delay on and then off after a second whenever loading from graphql is taking place
  useEffect(() => {
    setDelay(true);
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, [loading, loadingTips]);
  // if the delay is set to true then return the loading animation
  if (delay === true) {
    return (
      <div className="loader-icon">
        <Grid height="200" width="200" color="#6155a6" ariaLabel="loading" />
      </div>
    );
  }
  return (
    <>
      <div className="profile-page-container">
        <span className="profile-title"> {userData.username}'s Tips Stats</span>
        <aside>
          <div className="tip-history-container">
            <span className="tip-history-title">Tip History:</span>
            <br />
            <span className="tip-count">
              You have tipped:{userData.tipCount} times
            </span>
            {tipHistory.map((tips, i) => (
              <p className="tips-text" key={i}>
                ${tips}
              </p>
            ))}
          </div>
        </aside>
        <div className="fun-facts-container">
          <span className="facts-title">Fun Facts</span>
          <span className="most-tipped-text">
            {/* got rid of the use effect and replaced it with a better option */}
            You Usually tip ${modeString(tipHistory)}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
