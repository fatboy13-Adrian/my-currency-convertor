import React from "react";  //Import React library to use JSX and React components

//Select currency component that renders a dropdown for selecting currencies
const SelectCurrency = ({ currencies, selectedCurrency, onChange }) => 
{
  return (
    //Dropdown to select the currency, with value bound to selected currency and onChange handler
    <select value = {selectedCurrency} onChange = {(e) => onChange(e.target.value)}>

      {/*Map through the list of currencies and create an <option> for each one*/}
      {currencies.map((currency) => 
      (
        <option key = {currency} value = {currency}>
          {currency}  {/*Display the currency code as the option text */}
        </option>
      ))}
    </select>
  );
};

export default SelectCurrency; // Export the select currency component so it can be used in other parts of the app
