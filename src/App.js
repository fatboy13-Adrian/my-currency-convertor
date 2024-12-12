import React, {useState, useEffect} from "react";                     //Import react and hooks from react library
import ConvertorForm from "./ConvertorForm";                          //Import convertor form component
import DisplayResult from "./DisplayResult";                          //Import display result component
import {fetchCurrencyList, fetchConversionRate} from "./CurrencyAPI"; //Import API functions
import './App.css';                                                   //Import CSS file

//App component to manage currencies, conversion, and reset state
const App = () => 
{
  //State variables for amount, fromCurrency, toCurrency, rate, and result
  const [currencies, setCurrencies] = useState([]); 
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [fromCurrency] = useState("USD"); 
  const [toCurrency] = useState("EUR"); 

  //Fetch available currencies when the component mounts
  useEffect(() => 
  {
    fetchCurrencyList()
      .then((currencyList) => setCurrencies(currencyList))                    //Set currencies to state
      .catch((error) => console.error("Error fetching currencies:", error));  //Handle error
  }, []);

  //Handle currency conversion
  const handleConvert = async ({ amt, fromCurrency, toCurrency }) => 
  {
    const conversionRate = await fetchConversionRate(fromCurrency, toCurrency); //Fetch exchange rate
    setRate(conversionRate);                                                    //Set exchange rate
    const convertedAmount = amt * conversionRate;                               //Calculate converted amount
    setResult(convertedAmount);                                                 //Set result
  };

  //Handle reset
  const handleReset = () => 
  {
    setRate(null);    //Reset exchange rate
    setResult(null);  //Reset conversion result
  };

  return (
    <div className = "App">
      <h1>Currency Converter</h1>
      <ConvertorForm
        currencies = {currencies}
        onConvert = {handleConvert}  //Pass conversion handler
        onReset = {handleReset}      //Pass reset handler
      />
      <DisplayResult
        result = {result}
        rate = {rate}
        fromCurrency = {fromCurrency}
        toCurrency = {toCurrency}
      />
    </div>
  );
};

export default App; //Export App component
