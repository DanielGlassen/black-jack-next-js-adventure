import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import css from 'styles/Home.module.css';
import Game from '@/components/game/Game';
import { signOut } from 'config/firebase';
import { AuthContext } from 'components/context/AuthContext';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Image from 'next/image';
import homePic from '../assets/logo.png';

export default function Home() {
	const { user, setUser, email } = useContext(AuthContext);
	const auth = useContext(AuthContext).auth;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<Head>
				<title>Black Jack</title>
			</Head>

			<div className={css.container}>
				{user ? (
					<main className={css.main}>
						<div className={css.toolbar}>
							<p className={css.email}>{email}</p>
							<button
								className={'btn btn-outline-info px-4 w-20'}
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
						<div className={css.game}>
							<Game />
						</div>
					</main>
				) : (
					<>
						<div className={css.cover}>
							<Image
								src={homePic}
								width={500}
								height={300}
								alt="Logo"
							/>
						</div>
						<main className={css.auth}>
							<Link href="/login" passHref>
								<button
									className={'btn btn-outline-info px-4 w-20'}
								>
									Login
								</button>
							</Link>
							&nbsp;&nbsp;&nbsp;
							<Link href="/signup" passHref>
								<button
									className={'btn btn-outline-info px-4 w-20'}
								>
									Get Register
								</button>
							</Link>
						</main>
					</>
				)}
			</div>
		</div>
	);
}
