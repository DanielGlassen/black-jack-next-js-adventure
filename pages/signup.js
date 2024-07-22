import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'config/firebase';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { AuthContext } from 'components/context/AuthContext';
import css from 'styles/Auth.module.css';
import Image from 'next/image';
import homePic from '../assets/logo.png';

const SignUp = () => {
	const { email, setEmail } = useContext(AuthContext);
	const { password, setPassword } = useContext(AuthContext);
	const { emailErr, setEmailErr } = useContext(AuthContext);
	const { passwordErr, setPasswordErr } = useContext(AuthContext);
	const router = useRouter();
	const auth = getAuth();

	const clearInput = () => {
		setEmail('');
		setPassword('');
	};

	const clearErrs = () => {
		setEmailErr('');
		setPasswordErr('');
	};

	const handleSignUp = () => {
		clearErrs();

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				clearInput();
				router.push('/login');
			})
			.catch((err) => {
				const { code } = err;

				switch (code) {
					case 'auth/email-already-in-use':
						setEmailErr('Email is already in use.');
						break;
					case 'auth/invalid-email':
						setEmailErr('Invalid email format.');
						break;
					case 'auth/weak-password':
						setPasswordErr(
							'Password should be at least 6 characters long.'
						);
						break;
					default:
						setPasswordErr(
							'Failed to create account. Please try again.'
						);
						break;
				}
			});
	};

	return (
		<>
			<div className={css.logo}>
				<Image src={homePic} width={500} height={300} alt="Logo" />
			</div>
			<main className={css.container}>
				<Input
					htmlFor="signup-email"
					label="Email"
					type="text"
					autoFocus={true}
					value={email}
					onChange={setEmail}
					err={emailErr}
				/>
				<Input
					htmlFor="signup-password"
					label="Password"
					type="password"
					autoFocus={false}
					value={password}
					onChange={setPassword}
					err={passwordErr}
				/>
				<Button label="Sign Up" onClick={handleSignUp} />
			</main>
		</>
	);
};

export default SignUp;
