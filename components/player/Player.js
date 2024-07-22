import React from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const Player = ({ playerId, balance, bet, loading }) => {
	return (
		<div className="player-container">
			{loading ? <LoadingSpinner /> : <p>Balance: ${balance}</p>}
			<style jsx>{`
				.player-container {
					text-align: center;
					margin-bottom: 20px;
				}
			`}</style>
		</div>
	);
};

export default Player;
