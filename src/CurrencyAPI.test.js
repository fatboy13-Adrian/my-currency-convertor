import { fetchCurrencyList, fetchConversionRate } from './CurrencyAPI';
import axios from 'axios';

jest.mock('axios');

//Function to mock a successful response
function mockSuccessResponse(data) 
{
  axios.get.mockResolvedValue({ data });
}

//Function to mock an error response
function mockErrorResponse() 
{
  axios.get.mockRejectedValue(new Error('Network Error'));
}

//Function to assert successful currency list fetching
async function assertCurrencyListFetching(expectedCurrencies){
  const result = await fetchCurrencyList();
  expect(result).toEqual(expectedCurrencies); // Use .toEqual for array comparison
}

//Function to assert successful conversion rate fetching
async function assertConversionRateFetching(fromCurrency, toCurrency, expectedRate) 
{
  const rate = await fetchConversionRate(fromCurrency, toCurrency);
  expect(rate).toBe(expectedRate);
}

//Function to assert error handling in conversion rate fetching
async function assertConversionRateErrorHandling(fromCurrency, toCurrency, defaultRate) 
{
  const rate = await fetchConversionRate(fromCurrency, toCurrency);
  expect(rate).toBe(defaultRate);
}

//Test suite
describe('CurrencyAPI', () => {
  test('fetchCurrencyList should return currency codes', async () => {
    mockSuccessResponse({ rates: { USD: 1, EUR: 0.85, SGD: 1.35 } });
    await assertCurrencyListFetching(['USD', 'EUR', 'SGD']);
  });

  test('fetchConversionRate should return conversion rate', async () => {
    mockSuccessResponse({ rates: { EUR: 0.85 } });
    await assertConversionRateFetching('USD', 'EUR', 0.85);
  });

  test('fetchConversionRate should handle errors', async () => {
    mockErrorResponse();
    await assertConversionRateErrorHandling('USD', 'EUR', 1); // Default value
  });
});