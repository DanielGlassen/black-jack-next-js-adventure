import React, { useState, createContext, useEffect } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'config/firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
		});

		return unsubscribe;
	}, [auth]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				email,
				setEmail,
				password,
				setPassword,
				emailErr,
				setEmailErr,
				passwordErr,
				setPasswordErr,
				auth
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
