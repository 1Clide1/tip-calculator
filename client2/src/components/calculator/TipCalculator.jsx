// imports
import React, { useState, useEffect, useRef } from 'react';
// gql
import { useMutation } from '@apollo/client';
// utils
import Auth from '../../utils/auth';
import { ADD_PERCENTAGE, ADD_TIP_HISTORY } from '../../utils/mutations';
// syling
import '../../styles/partials/_tipcalculator.scss';

function TipCalculator() {
  // STATE CODE:

  // state for handling form submissions
  const [submit, setSubmit] = useState(false);

  // state to manage the user input fields
  const [form, setForm] = useState({
    bill: '',
    groupSize: '', // was originally groupNum but this should be more readable
  });

  // state to manage percent button values in the form
  const [percentage, setPercentage] = useState({
    percentValue: '',
  });

  //   state to save the tips and the tip totals
  const [tipAmounts, setTipAmounts] = useState({
    tip: '',
    total: '',
    groupTip: '',
    groupTotal: '',
  });

  // state to mange whether the user is in a group or just by themselves
  const [group, setGroup] = useState(false);

  // state to manage what percent button is clicked
  const [tenPercentBtnClicked, setPercentBtn] = useState(false);
  const [fifteenPercentBtnClicked, setFifteenPercentBtn] = useState(false);
  const [twentyPercentBtnClicked, setTwentyPercentBtn] = useState(false);

  // state to manage if a percent button is clicked or not
  const [percentBtnNotClicked, setNotClicked] = useState(false);

  // state to manage if a user clicked away from the results modal to close modal
  const [clickedAwayRM, setClickedAwayRM] = useState(false); // RM= results modal

  // state counter to make sure the use only needs to click 1 time to start the warning modal
  let [clickedAwayCounter, setClickedAwayCounter] = useState(0);

  // state to start the warning modal
  const [warningModal, setWarningModal] = useState(false);

  //   MUTATIONS:

  // mutation to add tip history
  const [addTipHistory, { error }] = useMutation(ADD_TIP_HISTORY);

  // mutation to add percentages
  const [addPercentage, { err }] = useMutation(ADD_PERCENTAGE);

  //   FUNCTIONS:

  // handle the input fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // enable group option in the tip calculator form
  const handleGroup = () => {
    setGroup(!group);
  };

  // handle the button values in the form
  const handlePercentage = (e) => {
    const { value } = e.target;
    setPercentage({
      ...percentage,
      percentValue,
    });

    // makes the unclicked percent buttons greyed out
    if (e.target.name === 'ten-percent-btn') {
      setPercentBtn(!tenPercentBtnClicked);
    } else if (e.target.name === 'fifteen-percent-btn') {
      setFifteenPercentBtn(!fifteenPercentBtnClicked);
    } else if (e.target.name === 'twenty-percent-btn') {
      setTwentyPercentBtn(!twentyPercentBtnClicked);
    }
    // the rest of the buttons become unusable
    setNotClicked(!percentBtnNotClicked);
  };

  // function to make the calculations
  const tipCalculator = async () => {
    if (group) {
      const groupTip = parseInt(
        (form.bill * percentage.percentValue) / form.groupSize,
      );
      const groupTotal = String(
        (parseInt(form.bill) + parseInt(groupTip)) / parseInt(form.groupSize),
      );

      setTipAmounts({
        groupTip,
        groupTotal,
      });
      console.log(tipAmounts.groupTotal, tipAmounts.groupTip);
    } else {
      console.log(form, percentage);
      const tip = String(parseInt(form.bill * percentage.percentValue));
      const total = String(parseInt(form.bill) + parseInt(tip));

      setResultAmount({
        tip,
        total,
      });

      // if user is logged in their stats are saved in the database
      if (Auth.loggedIn()) {
        console.log(tip);
        try {
          await addTipHistory({
            variables: { tip: String(tip) },
          });
          await addPercentage({
            variables: { percentage: String(percentage.percentValue) },
          });
          console.log(
            `added tip history $${tip} and percentage ${percentage.percentValue}% to user`,
          );
        } catch (e) {
          console.log(e, error, err);
        }
      }
    }
  };

  // function to handle submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    await tipCalculator();
    await setSubmit(true);
  };

  // function to reset states after submit that way you can submit again without a page reload
  const resetTipForm = () => {
    // if group is true set it to false
    if (group === true) {
      setGroup(!group);
    }

    // same thing if the percent buttons are true then set them back to false
    if (twentyPercentBtnClicked === true) {
      // ! because since they are true now that will make it false
      setTwentyPercentBtn(!twentyPercentBtnClicked);
    } else if (fifteenPercentBtnClicked === true) {
      setFifteenPercentBtn(!fifteenPercentBtnClicked);
    } else if (tenPercentBtnClicked === true) {
      setPercentBtn(!tenPercentBtnClicked);
    }

    // setting submit to false and percent button not clicked to false automatically because these will always be turned on to true
    setSubmit(!submit);
    setNotClicked(!percentBtnNotClicked);
    // setting the form input state back to nothing right away because that needs to be empty after reset
    setForm({
      bill: '',
      groupSize: '',
    });
    setPercentage({
      percentValue: '',
    });
    // get the yes and no checkbox to uncheck them
    const yesCheckbox = document.getElementById('yes-checkbox');
    const noCheckbox = document.getElementById('no-checkbox');

    // if yes is checked uncheck it if yes isn't check then uncheck no
    if (yesCheckbox.checked === true) {
      yesCheckbox.checked = false;
    } else {
      noCheckbox.checked = false;
    }
    if (clickedAwayRM === true) {
      setclickedAwayRM(false);
    }
    if (warningModal === true) {
      setWarningModal(false);
    }
    if (clickedAwayCounter >= 1) {
      console.log(`counter is ${clickedAwayCounter}`);
      setClickedAwayCounter(--clickedAwayCounter);
    }
  };

  // if user clicks the result bg then they will be able to close out of the result container modal
  const ClickToCloseModal = () => {
    let clickedBG = useRef();
    useEffect(() => {
      let startWarningModal = (e) => {
        if (submit === true) {
          if (!clickedBG.current?.contains(e.target)) {
            setClickedAwayRM(!clickedAwayRM);
            setWarningModal(true);
            setClickedAwayCounter(++clickedAwayCounter);
            console.log(clickedAwayCounter, clickedAwayRM);
          } else {
          }
          return null;
        }
      };
      // basically makes it happen only once that way the user can not just keep turning on and off this feature
      if (clickedAwayCounter >= 1) {
        return null;
      } else {
        document.addEventListener('mousedown', startWarningModal);
      }
      return () => {
        document.removeEventListener('mousedown', startWarningModal);
      };
    });
    return clickedBG;
  };

  // this starts the function above
  let clickedBG = ClickToCloseModal();

  // function if the user clicks the no button on the warning modal
  const RevertWarning = () => {
    setClickedAwayRM(false);
    setClickedAwayCounter(0);
  };

  return (
    <>
      <h1 className='tip-title'>
        <i className='lni lni-money-location'></i> Tip Calculator
      </h1>
      <div
        className='tip-calculator-container'
        itemScope
        itemType='http://schema.org/Article'
      >
        <form className='tip-form-container' onSubmit={handleSubmit}>
          <label className='label-title'> Enter Your Bill Amount</label> <br />
          <input
            className='bill-input'
            name='bill'
            type='number'
            placeholder='how much $'
            required
            minLength='1'
            onChange={handleInput}
            value={form.bill}
          />
          <label className='label-title'>How Much Do You Want To Tip</label>
          <button
            // a little gross but if a button is clicked then it will be green if not it will be unusable
            className={
              !tenPercentBtnClicked
                ? !percentBtnNotClicked
                  ? 'percent-btn'
                  : 'percent-btn not-clicked'
                : 'percent-btn clicked'
            }
            type='button'
            name='ten-percent-btn'
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
                  ? 'percent-btn'
                  : 'percent-btn not-clicked'
                : 'percent-btn clicked'
            }
            type='button'
            name='fifteen-percent-btn'
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
                  ? 'percent-btn'
                  : 'percent-btn not-clicked'
                : 'percent-btn clicked'
            }
            type='button'
            name='twenty-percent-btn'
            id={percentage.twenty}
            value={0.2}
            onClick={handlePercentage}
          >
            20%
          </button>
          <div className={group ? 'display-none' : 'group-question-container'}>
            <label className='label-title'>In A Group?</label>
            <div className='row'>
              <label className='label-title'>Yes</label>
              <input
                id='yes-checkbox'
                className='checkbox'
                name='group'
                type='checkbox'
                onClick={handleGroup}
              />{' '}
              <label className='label-title'>No</label>
              <input
                id='no-checkbox'
                className='checkbox'
                name='nogroup'
                type='checkbox'
                // if you did not hit yes then you need to hit no before you can submit
                required={group ? false : true}
              />
            </div>
          </div>
          {group ? (
            <>
              <label className='label-title'>
                How Many People Are In Your Group?
              </label>
              <input
                className='bill-input'
                name='groupSize'
                type='number'
                placeholder='how big is the group?'
                required
                minLength='1'
                onChange={handleInput}
                value={form.groupSize}
              />
            </>
          ) : null}
          <button className='submit-btn submit-tip' type='submit'>
            Get Your Tip!
          </button>
        </form>
        {submit ? (
          // result bg is the blurred/darkened background
          <div className='result-bg'>
            <div
              ref={clickedBG}
              className={
                clickedAwayRM === true
                  ? 'result-container active'
                  : 'result-container'
              }
            >
              <span className='exit-icon'>
                <i className='lni lni-cross-circle ' onClick={resetTipForm}></i>
              </span>
              {/* down below are where the result modal is. 
              basically this will create a modal where it is either the results for one person/user. 
              or if it is the results for the user's group*/}
              {submit ? (
                group ? (
                  <div>
                    <p className='results-text'>Your group's tips are:</p>
                    <p className='results-text group-text'>*per-person*</p>
                    <p className='results-text'>{resultAmount.groupTip}</p>
                  </div>
                ) : (
                  <div>
                    <p className='results-text'>Your tip is:</p>
                    <p className='results-text'>${resultAmount.tip}</p>
                  </div>
                )
              ) : null}
              {submit ? (
                group ? (
                  <div>
                    <p className='results-text'>Your group's total is:</p>
                    <p className='results-text group-text'>*per-person*</p>
                    <p className='results-text'>{resultAmount.groupTotal}</p>
                  </div>
                ) : (
                  <div>
                    <p className='results-text'>Your total is:</p>
                    <p className='results-text'>${resultAmount.total}</p>
                  </div>
                )
              ) : null}
              {submit ? (
                <button className='submit-btn' onClick={resetTipForm}>
                  Tip Again?
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* this is the warning modal */}
        {warningModal === true ? (
          <div
            className={
              clickedAwayRM === false ? 'warning-modal active' : 'warning-modal'
            }
          >
            <i
              className='lni lni-cross-circle exit-icon'
              onClick={resetTipForm}
            ></i>
            <p className='label-title width-50 margin-in'>Hold Up</p>
            <p className='results-text'>You sure you wanna close?</p>
            <button className='submit-btn' onClick={resetTipForm}>
              Yeah
            </button>
            <button className='submit-btn' onClick={RevertWarning}>
              Nah
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default TipCalculator;
