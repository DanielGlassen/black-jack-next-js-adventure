import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
	it('renders card image correctly', () => {
		const card = {
			image: 'path_to_image.jpg'
		};

		const { container } = render(<Card card={card} />);

		const cardImage = container.querySelector('.card');
		expect(cardImage).toBeInTheDocument();
		expect(cardImage).toHaveAttribute('src', card.image);
	});
});
