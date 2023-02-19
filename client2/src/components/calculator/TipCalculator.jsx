// imports
import React, { useState, useEffect, useRef } from 'react';
// gql
import { useMutation } from '@apollo/client';
// utils
import Auth from '../../utils/auth';
import { ADD_PERCENTAGE, ADD_TIP_HISTORY } from '../../utils/mutations';
// syling
import '../../styles/partials/_tipcalculator.scss';

function TipCalculator(){
    // State Code :
    const [submit, setSumbit] = useState(false); // state for handling form submissions

    const [form, setForm]= useState({ // state to manage the user input fields
        bill: '',
        groupSize: '', // was originally groupNum but this should be more readable
    });
    
};

export default TipCalculator;