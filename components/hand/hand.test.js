import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hand from './Hand';

describe('Hand component', () => {
	it('renders cards correctly', () => {
		const hand = [
			{ code: '1', image: 'card_image_1.jpg' },
			{ code: '2', image: 'card_image_2.jpg' }
		];
		const isDealer = false;
		const showDealerCards = true;

		const { container } = render(
			<Hand
				hand={hand}
				isDealer={isDealer}
				showDealerCards={showDealerCards}
			/>
		);

		const cardElements = container.querySelectorAll('.card');
		expect(cardElements.length).toBe(hand.length);

		hand.forEach((card, index) => {
			const cardElement = cardElements[index];
			expect(cardElement).toBeInTheDocument();
			expect(cardElement).toHaveAttribute('src', card.image);
		});
	});
});
