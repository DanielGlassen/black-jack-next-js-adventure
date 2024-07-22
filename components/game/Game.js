import React, { useEffect, useState } from 'react';
import styles from '../../styles/Game.module.css';
import Bet from '../bet/Bet';
import Card from '../card/Card';
import Player from '../player/Player';
import { drawCards } from '../../lib/api';
import { gameResult, handValue, playBlackjack } from '../../lib/gameLogic';
import { Alert } from '../alert/Alert';
import {
	getPlayerBalance,
	updatePlayerBalance,
	listenToAuthChanges
} from '../../config/firebase';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const Game = () => {
	const [playerId, setPlayerId] = useState(null);
	const [playerHand, setPlayerHand] = useState([]);
	const [dealerHand, setDealerHand] = useState([]);
	const [deckId, setDeckId] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [balance, setBalance] = useState(1000);
	const [bet, setBet] = useState(0);
	const [gamePhase, setGamePhase] = useState('initial');
	const [lastBet, setLastBet] = useState(null);
	const [showDealerCards, setShowDealerCards] = useState(false);
	const [restartButton, setRestartButton] = useState(false);
	const [loadingBalance, setLoadingBalance] = useState(true);

	useEffect(() => {
		listenToAuthChanges(async (userId) => {
			if (userId) {
				setPlayerId(userId);
				const initialBalance = await getPlayerBalance(userId);
				setBalance(initialBalance);
				setLoadingBalance(false);
			} else {
				setPlayerId(null);
				setBalance(1000);
			}
		});
	}, []);

	const handlePlaceBet = async (betAmount) => {
		try {
			const res = await playBlackjack(playerId, betAmount);
			setPlayerHand(res.playerHand);
			setDealerHand(res.dealerHand);
			setDeckId(res.deckId);
			setBet(betAmount);
			setGamePhase('playing');
		} catch (error) {
			console.error('Error placing bet:', error);
		}
	};

	const handleHit = async () => {
		try {
			const newCards = await drawCards(deckId, 1);
			setPlayerHand((prevHand) => [...prevHand, ...newCards]);
			await checkPlayerHand([...playerHand, ...newCards]);
		} catch (error) {
			console.error('Error handling hit:', error);
		}
	};

	const checkPlayerHand = async (updatedHand) => {
		try {
			let currentPlayerHandValue = await handValue(updatedHand);

			if (currentPlayerHandValue > 21) {
				await handleGameEnd('dealer');
			} else if (currentPlayerHandValue === 21) {
				await handleStand();
			}
		} catch (error) {
			console.error('Error checking player hand:', error);
		}
	};

	const handleStand = async () => {
		try {
			setShowDealerCards(true);
			setGamePhase('stand');
		} catch (error) {
			console.error('Error handling stand:', error);
		}
	};

	useEffect(() => {
		const determineResult = async () => {
			const result = await gameResult(playerHand, dealerHand, deckId);
			await handleGameEnd(result);
		};

		if (gamePhase === 'stand' && dealerHand.length === 2) {
			determineResult();
		}
	}, [dealerHand, gamePhase]);

	const handleGameEnd = async (result, isBj = false) => {
		if (result === null) {
			return;
		}

		setGameOver(true);

		let message = '';
		let messageType = 'success';
		let balanceChange = 0;
		const playerValue = await handValue(playerHand);
		const dealerValue = await handValue(dealerHand);

		if (playerValue > 21) {
			message = 'You lose - busted!';
			balanceChange = -bet;
			messageType = 'error';
		} else if (dealerValue > 21) {
			message = 'You win - dealer busted!';
			balanceChange = bet;
		} else {
			if (isBj === true) {
				message = 'Blackjack!';
				balanceChange = bet * 1.5;
			} else {
				if (result === 'player') {
					message = 'You win!';
					balanceChange = bet;
				} else if (result === 'dealer') {
					message = 'You lose!';
					balanceChange = -bet;
					messageType = 'error';
				} else {
					message = "It's a draw!";
					messageType = 'warning';
				}
			}
		}

		Alert({ message, type: messageType });

		const newBalance = balance + balanceChange;
		setBalance(newBalance);

		try {
			await updatePlayerBalance(playerId, newBalance);
		} catch (error) {
			console.error('Error updating balance in Firebase:', error);
		}

		setRestartButton(true);
		setLastBet(bet);
	};

	const handleRestart = () => {
		setPlayerHand([]);
		setDealerHand([]);
		setGameOver(false);
		setBet(0);
		setDeckId(null);
		setGamePhase('initial');
		setShowDealerCards(false);
	};

	return (
		<>
			{loadingBalance ? (
				<LoadingSpinner />
			) : (
				<>
					{/* Game UI */}
					{balance < 10 && (
						<div className="game-container text-center">
							<div
								className={
									styles.jumbotron +
									' d-flex flex-column align-items-center justify-content-center'
								}
							>
								<h4 className={'display-6'}>
									Your balance is less than $10, you can
									refresh the page to join the new game.
								</h4>
							</div>
						</div>
					)}
					{balance >= 10 && (
						<div className="game-container text-center">
							<div className="dealer">
								{gamePhase !== 'initial' && <h2>Dealer</h2>}
								<div className="dealer-hand">
									{dealerHand.map((card, index) => (
										<Card
											key={index}
											card={card}
											hidden={
												index === 0 && !showDealerCards
											}
										/>
									))}
								</div>
							</div>
							<div className="player mt-5">
								{gamePhase !== 'initial' && <h2>Player</h2>}
								<Player
									playerId={playerId}
									balance={balance}
									bet={bet}
									loading={loadingBalance}
								/>
								{gamePhase === 'playing' ? (
									<p>Current Bet: ${bet}</p>
								) : (
									''
								)}
								{gamePhase === 'playing' && (
									<div className="player-hand">
										{playerHand.map((card, index) => (
											<Card key={index} card={card} />
										))}
									</div>
								)}
								{gamePhase === 'initial' && !gameOver && (
									<Bet
										onPlaceBet={handlePlaceBet}
										lastBet={lastBet}
										balance={balance}
									/>
								)}
							</div>
							{gamePhase === 'playing' && (
								<div className="buttonArea d-flex flex-row align-items-center justify-content-center mt-4">
									{!gameOver && (
										<>
											<button
												className={
													'standButton btn btn-outline-warning px-4 me-3'
												}
												onClick={handleStand}
											>
												Stand
											</button>
											<button
												className={
													'hitButton btn btn-success px-4'
												}
												onClick={handleHit}
											>
												Hit
											</button>
										</>
									)}
								</div>
							)}
							{gameOver && (
								<div className="buttonArea d-flex flex-row align-items-center justify-content-center mt-4">
									<button
										className={
											'restartButton btn btn-outline-primary px-4'
										}
										onClick={handleRestart}
									>
										Restart
									</button>
								</div>
							)}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Game;
