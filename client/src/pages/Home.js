import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_TIP_HISTORY, ADD_PERCENTAGE } from "../utils/mutations";
// import css
import "./home.css";

const Home = () => {
  // set state for submitting
  const [submit, setSubmit] = useState(false);

  // set state for form
  const [form, setForm] = useState({
    bill: "",
  });

  // set state for button percentages
  const [percentage, setPercentage] = useState({
    value: "",
  });

  // state to hold the total
  const [total, setTotal] = useState({
    tip: "",
  });

  // mutation to add tip history
  const [addTipHistory, { error }] = useMutation(ADD_TIP_HISTORY);

  // mutation to add percentages
  const [addPercentage, { err }] = useMutation(ADD_PERCENTAGE);
  // state to have button clicked
  // const [btnClicked, setBtnClicked] = useState(false);
  // handle input field
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(e.target.value);
  };

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
    console.log(form, percentage);
    const tip = parseInt(form.bill * percentage.value);
    setTotal({
      tip,
    });
    if (Auth.loggedIn()) {
      try {
        console.log(percentage.value);
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
          <input className="submit-btn submit-tip" type="submit" />
        </form>
        <div className="result-container">
          <p className="tip-total-text">Your tip is:</p>{" "}
          {submit ? <p className="tip-total-text">${total.tip}</p> : null}
        </div>
      </div>
    </>
  );
};

export default Home;
