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
  // State Code :
  const [submit, setSumbit] = useState(false); // state for handling form submissions

  // state to manage the user input fields
  const [form, setForm] = useState({
    bill: '',
    groupSize: '', // was originally groupNum but this should be more readable
  });
// state to manage percent button values in the form
  const [percentage, setPercentage] = useState({
    percentValue: '', //just value seemed too vague so this should be better for readablility
  });

//   state to save the tips and the tip totals
const [tipAmounts, setTipAmounts]= useState({
    tip: '',
    total: '',
    groupTip: '',
    groupTotal:'',
});

const [group, setGroup] =useState(false);

}

export default TipCalculator;
