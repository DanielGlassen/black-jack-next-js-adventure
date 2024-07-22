import { createDeck, drawCards } from './api';

export const cardValue = (card) => {
	const rank = card.value;
	if (['KING', 'QUEEN', 'JACK'].includes(rank)) {
		return 10;
	} else if (rank === 'ACE') {
		return 11;
	} else {
		return parseInt(rank, 10);
	}
};

export const handValue = async (hand) => {
	let value = 0;
	let aceCount = 0;

	for (let card of hand) {
		const cardVal = cardValue(card);

		if (cardVal === 11) {
			aceCount++;
		}
		value += cardVal;
	}

	while (value > 21 && aceCount > 0) {
		value -= 10;
		aceCount--;
	}

	return value;
};

export const gameResult = async (playerHand, dealerHand, deckId) => {
	try {
		let playerValue = await handValue(playerHand);
		let dealerValue = await handValue(dealerHand);
		while (dealerValue < 17) {
			const newCard = await drawCards(deckId, 1);
			dealerHand.push(newCard[0]);
			dealerValue = await handValue(dealerHand);
		}

		if (playerValue > 21) {
			return 'dealer';
		} else if (dealerValue > 21) {
			return 'player';
		} else if (playerValue > dealerValue) {
			return 'player';
		} else if (playerValue < dealerValue) {
			return 'dealer';
		}

		return 'push';
	} catch (error) {
		console.error('Error determining game result:', error);
		throw error;
	}
};

export const playBlackjack = async (playerId, betAmount) => {
	try {
		const deckId = await createDeck();

		const playerCards = await drawCards(deckId, 2);
		const dealerCards = await drawCards(deckId, 2);

		return {
			deckId: deckId,
			playerId: playerId,
			playerHand: playerCards,
			dealerHand: dealerCards
		};
	} catch (error) {
		console.error('Error initializing game:', error);
		throw error;
	}
};
