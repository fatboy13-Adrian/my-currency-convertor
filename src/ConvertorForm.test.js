import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ConvertorForm from './ConvertorForm';

describe('ConvertorForm', () => {
  const currencies = ['USD', 'EUR', 'SGD'];
  const mockConvert = jest.fn();
  const mockReset = jest.fn();

  test('renders input fields and buttons', () => {
    render(
      <ConvertorForm
        currencies={currencies}
        onConvert={mockConvert}
        onReset={mockReset}
      />
    );

    expect(screen.getByLabelText(/Amount:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/From:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Convert/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  test('calls onConvert with correct data', () => {
    render(
      <ConvertorForm
        currencies={currencies}
        onConvert={mockConvert}
        onReset={mockReset}
      />
    );

    fireEvent.change(screen.getByLabelText(/Amount:/i), {
      target: {value: '1'},
    });

    fireEvent.change(screen.getByLabelText(/From:/i), { target: { value: 'USD' } });
    fireEvent.change(screen.getByLabelText(/To:/i), { target: { value: 'EUR' } });
    fireEvent.click(screen.getByRole('button', { name: /Convert/i }));

    expect(mockConvert).toHaveBeenCalledWith({
      amt: '100',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
    });
  });

  test('calls onReset', () => {
    render(
      <ConvertorForm
        currencies={currencies}
        onConvert={mockConvert}
        onReset={mockReset}
      />
    );

    fireEvent.click(screen.getByRole('button', {name: /Reset/i}));
    expect(mockReset).toHaveBeenCalled();
  });
});