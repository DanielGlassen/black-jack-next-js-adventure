import React from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const Player = ({ playerId, balance, bet, loading }) => {
	const containerStyle = {
		textAlign: 'center',
		marginBottom: '20px'
	};

	return (
		<div style={containerStyle}>
			{loading ? <LoadingSpinner /> : <p>Balance: ${balance}</p>}
		</div>
	);
};

export default Player;
