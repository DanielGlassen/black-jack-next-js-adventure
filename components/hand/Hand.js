import React from 'react';
import Card from '../card/Card';
import './Hand.css'; // Import the CSS file

const Hand = ({ hand, isDealer, showDealerCards }) => {
	return (
		<div className="hand-container">
			{hand.map((card, index) => (
				<Card
					key={card.code}
					card={card}
					hidden={index === 0 && isDealer && !showDealerCards}
				/>
			))}
		</div>
	);
};

export default Hand;
