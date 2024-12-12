import React, { useState } from "react";        //Import React and hooks
import SelectCurrency from './SelectCurrency';  //Import select currency component

//Convertor form component to handle currency selection and input amount
const ConvertorForm = ({currencies, onConvert, onReset}) => 
{
  const [amt, setAmt] = useState(0);                       //State for tracking amount
  const [fromCurrency, setFromCurrency] = useState("SGD"); //Default source currency as USD
  const [toCurrency, setToCurrency] = useState("USD");     //Default target currency as EUR

  //Handle the conversion action
  const handleConvert = () => 
  {
    onConvert({amt, fromCurrency, toCurrency});           //Pass the data to parent for conversion
  };

  //Handle the reset action
  const handleReset = () => 
  {
    setAmt(0);              //Reset amount
    setFromCurrency("SGD"); //Reset fromCurrency
    setToCurrency("USD");   //Reset toCurrency
    onReset();              //Call parent's reset function to reset exchange rate and result
  };

  return (
    <div className = "convertor-form">
      <div className = "currency-selection">
        {/*From Currency Dropdown*/}
        <div className = "currency-select">
          <label>From:</label>
          <SelectCurrency
            currencies = {currencies}
            selectedCurrency = {fromCurrency}
            onChange = {setFromCurrency}
          />
        </div>

        {/*To Currency Dropdown*/}
        <div className = "currency-select">
          <label>To:</label>
          <SelectCurrency
            currencies = {currencies}
            selectedCurrency = {toCurrency}
            onChange = {setToCurrency}
          />
        </div>
      </div>

      {/*Input Amount*/}
      <div className = "amount-input">
        <label>Amount:</label>
        <input
          type = "number"
          value = {amt}
          onChange={(e) => setAmt(e.target.value)} //Update the amount on input change
        />
      </div>

      {/*Conversion and Reset Buttons*/}
      <button onClick = {handleConvert}>Convert</button> {/*Convert Button*/}
      <button onClick = {handleReset}>Reset</button>     {/*Reset Button*/}

      {/*Display the selected currencies*/}
      <div className = "currency-display">
      <h3>From: {fromCurrency} to: {toCurrency}</h3>
      </div>
    </div>
  );
};

export default ConvertorForm; //Export convertor form component
