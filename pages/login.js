import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from 'config/firebase';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { AuthContext } from 'components/context/AuthContext';
import css from 'styles/Auth.module.css';
import Image from 'next/image';
import homePic from '../assets/logo.png';

const Login = () => {
	const { setUser } = useContext(AuthContext);
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
	const router = useRouter();
	const auth = getAuth();

	const clearErrs = () => {
		setEmailErr('');
		setPasswordErr('');
	};

	const handleLogin = () => {
		clearErrs();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const firebaseUser = userCredential.user;
				setUser(firebaseUser);
				router.push('/');
			})
			.catch((err) => {
				const { code } = err;

				switch (code) {
					case 'auth/invalid-email':
						setEmailErr('Invalid Email');
						break;
					case 'auth/user-disabled':
						setEmailErr('Account disabled');
						break;
					case 'auth/user-not-found':
						setEmailErr('Email not found');
						break;
					case 'auth/missing-password':
						setPasswordErr('Enter Password');
						break;
					case 'auth/wrong-password':
						setPasswordErr('Invalid Password');
						break;
					default:
						setPasswordErr('Login failed. Please try again.');
						break;
				}
			});
	};

	useEffect(() => {
		const authListener = () => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user) {
					setPassword('');
					setUser(user);
				} else {
					setUser('');
				}
			});
			return unsubscribe; // Clean up subscription on unmount
		};

		const unsubscribe = authListener();

		// Cleanup function to unsubscribe from the auth listener
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, [auth, setUser, setPassword]); // Include dependencies used inside useEffect

	return (
		<>
			<div className={css.logo}>
				<Image src={homePic} width={500} height={300} alt="Logo" />
			</div>

			<main className={css.container}>
				<Input
					htmlFor="email"
					label="Email"
					type="text"
					autoFocus={true}
					value={email}
					onChange={setEmail}
					err={emailErr}
				/>
				<Input
					htmlFor="password"
					label="Password"
					type="password"
					autoFocus={false}
					value={password}
					onChange={setPassword}
					err={passwordErr}
				/>
				<Button label="Login" onClick={handleLogin} />
			</main>
		</>
	);
};

export default Login;
