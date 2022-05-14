import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_TIP_HISTORY, ADD_PERCENTAGE } from "../../utils/mutations";
import "./tip-calculator.css";

const TipCalculator = () => {
  // ALL THE STATES
  // set state for submitting
  const [submit, setSubmit] = useState(false);

  // set state for form
  const [form, setForm] = useState({
    bill: "",
    groupNum: "",
  });

  // set state for button percentages
  const [percentage, setPercentage] = useState({
    value: "",
  });

  // state to hold the total of the tip
  const [resultAmount, setResultAmount] = useState({
    tip: "",
    total: "",
    groupTip: "",
    groupTotal: "",
  });

  //   state to manage whether there is a group or not
  const [group, setGroup] = useState(false);

  // states for the percent button validation
  const [tenPercentBtnClicked, setPercentBtn] = useState(false);
  const [fifteenPercentBtnClicked, setFifteenPercentBtn] = useState(false);
  const [twentyPercentBtnClicked, setTwentyPercentBtn] = useState(false);
  // check if the percent button states are false
  const [percentBtnNotClicked, setNotClicked] = useState(false);
  //   MUTATIONS
  // mutation to add tip history
  const [addTipHistory, { error }] = useMutation(ADD_TIP_HISTORY);

  // mutation to add percentages
  const [addPercentage, { err }] = useMutation(ADD_PERCENTAGE);

  //   FUNCTIONS
  // handle input field
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(e.target.value);
  };
  //   function to setup the group form question
  const handleGroup = () => {
    setGroup(!group);
  };
  console.log(group);
  // handle button values
  const handlePercentage = (e) => {
    const { value } = e.target;
    setPercentage({
      ...percentage,
      value,
    });
    console.log(e.target.value);
    if (e.target.name === "ten-percent-btn") {
      setPercentBtn(!tenPercentBtnClicked);
    } else if (e.target.name === "fifteen-percent-btn") {
      setFifteenPercentBtn(!fifteenPercentBtnClicked);
    } else if (e.target.name === "twenty-percent-btn") {
      setTwentyPercentBtn(!twentyPercentBtnClicked);
    }
    // the rest of the buttons become unusable
    setNotClicked(!percentBtnNotClicked);
  };
  // function
  // function to make the calculations
  const tipCalculator = async () => {
    if (group) {
      const groupTip = parseInt((form.bill * percentage.value) / form.groupNum);
      const groupTotal = String(
        (parseInt(form.bill) + parseInt(groupTip)) / parseInt(form.groupNum)
      );

      setResultAmount({
        groupTip,
        groupTotal,
      });
      console.log(resultAmount.groupTotal, resultAmount.groupTip);
    } else {
      console.log(form, percentage);
      const tip = String(parseInt(form.bill * percentage.value));
      const total = String(parseInt(form.bill) + parseInt(tip));

      setResultAmount({
        tip,
        total,
      });

      if (Auth.loggedIn()) {
        console.log(tip);
        try {
          await addTipHistory({
            variables: { tip: String(tip) },
          });
          await addPercentage({
            variables: { percentage: String(percentage.value) },
          });
          console.log(
            `added tip history $${tip} and percentage ${percentage.value}% to user`
          );
        } catch (e) {
          console.log(e, error, err);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await tipCalculator();
    await setSubmit(true);
  };

  // const changeBtnStyle = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.value === e.target.value) setBtnClicked(!btnClicked);
  // };

  return (
    <>
      <h1 className="tip-title">
        <i className="lni lni-money-location"></i> Tip Calculator
      </h1>
      <div className="tip-calculator-container">
        <form className="tip-form-container" onSubmit={handleSubmit}>
          <label className="label-title"> Enter Your Bill Amount</label> <br />
          <input
            className="bill-input"
            name="bill"
            type="number"
            placeholder="how much $"
            required
            minLength="1"
            onChange={handleInput}
            value={form.bill}
          />
          <label className="label-title">How Much Do You Want To Tip</label>
          <button
            // a little gross but if a button is clicked then it will be green if not it will be unusable
            className={
              !tenPercentBtnClicked
                ? !percentBtnNotClicked
                  ? "percent-btn"
                  : "percent-btn not-clicked"
                : "percent-btn clicked"
            }
            type="button"
            name="ten-percent-btn"
            id={percentage.ten}
            value={0.1}
            onClick={handlePercentage}
          >
            10%
          </button>
          <button
            className={
              !fifteenPercentBtnClicked
                ? !percentBtnNotClicked
                  ? "percent-btn"
                  : "percent-btn not-clicked"
                : "percent-btn clicked"
            }
            type="button"
            name="fifteen-percent-btn"
            id={percentage.fifteen}
            value={0.15}
            onClick={handlePercentage}
          >
            15%
          </button>
          <button
            className={
              !twentyPercentBtnClicked
                ? !percentBtnNotClicked
                  ? "percent-btn"
                  : "percent-btn not-clicked"
                : "percent-btn clicked"
            }
            type="button"
            name="twenty-percent-btn"
            id={percentage.twenty}
            value={0.2}
            onClick={handlePercentage}
          >
            20%
          </button>
          <div className={group ? "display-none" : "group-question-container"}>
            <label className="label-title">In A Group?</label>
            <div className="row">
              <span className="label-title">Yes</span>
              <input
                className="checkbox"
                name="group"
                type="checkbox"
                onClick={handleGroup}
              />{" "}
              <span className="label-title">No</span>
              <input className="checkbox" name="nogroup" type="checkbox" />
            </div>
          </div>
          {group ? (
            <>
              <label className="label-title">
                How Many People Are In Your Group?
              </label>
              <input
                className="bill-input"
                name="groupNum"
                type="number"
                placeholder="how big is the group?"
                required
                minLength="1"
                onChange={handleInput}
                value={form.groupNum}
              />
            </>
          ) : null}
          <input className="submit-btn submit-tip" type="submit" />
        </form>
        <div className="result-container">
          {group ? (
            <p className="results-text">Your group's tips are:</p>
          ) : (
            <p className="results-text">Your tip is:</p>
          )}
          {group ? (
            <p className="results-text group-text">*per-person*</p>
          ) : null}
          {submit ? (
            group ? (
              <p className="results-text">{resultAmount.groupTip}</p>
            ) : (
              <p className="results-text">${resultAmount.tip}</p>
            )
          ) : null}
          {group ? (
            <p className="results-text">Your group's total is:</p>
          ) : (
            <p className="results-text">Your total is:</p>
          )}

          {group ? (
            <p className="results-text group-text">*per-person*</p>
          ) : null}
          {submit ? (
            group ? (
              <p className="results-text">{resultAmount.groupTotal}</p>
            ) : (
              <p className="results-text">${resultAmount.total}</p>
            )
          ) : null}
          {submit ? (
            <button
              className="submit-btn"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Tip Again?
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TipCalculator;