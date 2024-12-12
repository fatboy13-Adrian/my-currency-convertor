import axios from 'axios';  //Import axios for making HTTP requests

//Fetch the list of available currencies (using USD as the base currency)
export const fetchCurrencyList = async () => 
{
  try 
  {
    
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/SGD'); //Fetch data from the Exchange Rate API for the base currency SGD
    
    //Return a list of currency codes from the API response
    //Response.data.rates contains all the exchange rates, and we only want the currency symbols
    return Object.keys (response.data.rates);  //Extract the currency symbols from rates object

  } 
  catch (error) 
  {
    
    console.error ('Error fetching currencies:', error); //Log the error if the API call fails
    return [];                                          //Return an empty array in case of an error
  }
};

//Fetch the conversion rate between two currencies
export const fetchConversionRate = async (fromCurrency, toCurrency) => 
{
  try 
  {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`); //Fetch conversion data for the 'from' currency
    //Return the conversion rate for the 'to' currency from the API response
    return response.data.rates[toCurrency];                                                         //Response.data.rates[toCurrency] accesses the specific conversion rate for the 'to' currency

  } 
  
  catch (error) 
  {
    
    console.error ('Error fetching conversion rate:', error);   //Log the error if the API call fails
    return 1;                                                   //Return a default value (1) in case of an error to avoid breaking the app
  }
};
