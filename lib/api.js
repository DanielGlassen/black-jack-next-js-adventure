const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const createDeck = async () => {
	const response = await fetch(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
	const data = await response.json();
	return data.deck_id;
};

export const drawCards = async (deckId, count) => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/${deckId}/draw/?count=${count}`
		);
		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(
					`Deck or endpoint not found: ${response.status} ${response.statusText}`
				);
			} else {
				throw new Error(
					`Failed to draw cards: ${response.status} ${response.statusText}`
				);
			}
		}
		const data = await response.json();
		return data.cards;
	} catch (error) {
		console.error('Error in drawCards:', error);
		throw error;
	}
};

export const reshuffleDeck = async (deckId) => {
	await fetch(`${API_BASE_URL}/${deckId}/shuffle/`);
};
