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
  //   const [totalAmount, setTotalAmount] = useState({
  //     total: "",
  //   });
  //   state to manage whether there is a group or not
  const [group, setGroup] = useState(false);

  //   MUTATIONS
  // mutation to add tip history
  const [addTipHistory, { error }] = useMutation(ADD_TIP_HISTORY);

  // mutation to add percentages
  const [addPercentage, { err }] = useMutation(ADD_PERCENTAGE);

  // state to have button clicked
  // const [btnClicked, setBtnClicked] = useState(false);

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
  };
  // function to make the calculation
  const tipCalculator = async () => {
    if (group === true) {
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
      const tip = parseInt(form.bill * percentage.value);
      const total = String(parseInt(form.bill) + parseInt(tip));
      setResultAmount({
        tip,
        total,
      });
    }

    // setTotalAmount({
    //   total,
    // });

    if (Auth.loggedIn()) {
      try {
        console.log(percentage.value);
        await addTipHistory({
          variables: { tip: String(resultAmount.tip) },
        });
        await addPercentage({
          variables: { percentage: String(percentage.value) },
        });
        console.log(
          `added tip history $${resultAmount.tip} and percentage ${percentage.value}% to user`
        );
      } catch (e) {
        console.log(e, error, err);
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
  console.log(resultAmount);
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
            onChange={handleInput}
            value={form.bill}
          />
          <label className="label-title">How Much Do You Want To Tip</label>
          <button
            className="percent-btn"
            type="button"
            id={percentage.ten}
            value={0.1}
            onClick={handlePercentage}
          >
            10%
          </button>
          <button
            className="percent-btn"
            type="button"
            id={percentage.fifteen}
            value={0.15}
            onClick={handlePercentage}
          >
            15%
          </button>
          <button
            className="percent-btn"
            type="button"
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
        </div>
      </div>
    </>
  );
};

export default TipCalculator;
