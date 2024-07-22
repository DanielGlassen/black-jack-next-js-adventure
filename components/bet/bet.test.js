import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Bet from './Bet';

describe('Bet component', () => {
	it('updates bet amount on change and calls onPlaceBet with correct amount', () => {
		const mockOnPlaceBet = jest.fn();
		const { getByText, getByRole } = render(
			<Bet onPlaceBet={mockOnPlaceBet} lastBet={null} balance={1000} />
		);
		const selectElement = getByRole('combobox');
		fireEvent.change(selectElement, { target: { value: '50' } });
		const placeBetButton = getByText('Place Bet');
		fireEvent.click(placeBetButton);

		expect(mockOnPlaceBet).toHaveBeenCalledWith(50);
	});
});
