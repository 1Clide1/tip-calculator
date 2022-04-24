import React, { useState, useEffect } from "react";
// import Auth from "../utils/auth";
// import graphql
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import css
import "./profile-page.css";
// import { removeBookId } from '../utils/localStorage';

const ProfilePage = () => {
  const [tipHistory, setTipHistory] = useState([""]);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // function to store tips into a state. got it to work by saying that if the tiphistory exists then map out the tip history.
  const getTips = async () => {
    if (userData.tipHistory) {
      const tipData = await userData.tipHistory.map((tip) => tip.tip);
      await setTipHistory(tipData);
      console.log(tipData);
    }
  };

  useEffect(() => {
    getTips();
    // dependency gives a slight error however it gives the intended result so I am fine with that small error the sugestion gives an infinite loop
  }, [userData.tipHistory]);

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
      } else if (modeMap[el] === maxCount) {
        maxEl += "&" + el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  };

  if (loading) {
    return <h2>GETTING THE TIP STATS...</h2>;
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
            {userData.tipHistory.map((tips, i) => (
              <p className="tips-text" key={i}>
                ${tips.tip}
              </p>
            ))}
          </div>
        </aside>
        <div className="fun-facts-container">
          <span className="facts-title">Fun Facts</span>
          <span className="most-tipped-text">
            You Usually tip ${modeString(tipHistory)}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
