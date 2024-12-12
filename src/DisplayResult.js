import React from "react";  //Import React

//Display result component to show the exchange rate and converted amount
const DisplayResult = ({result, rate, fromCurrency, toCurrency}) => 
{
  return (
    <div className = "result">
      {/*Show exchange rate*/}
      {rate && (
        <h2>
          Exchange Rate: $1 {fromCurrency} = {rate} {toCurrency}
        </h2>
      )}

      {/*Show conversion result*/}
      {result && (
        <p>
          {result} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default DisplayResult; //Export display result component
