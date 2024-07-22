import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_Firebase_API_Key,
	authDomain: process.env.NEXT_PUBLIC_Auth_Domain,
	projectId: process.env.NEXT_PUBLIC_Project_Id,
	storageBucket: process.env.NEXT_PUBLIC_Storage_Bucket,
	messagingSenderId: process.env.NEXT_PUBLIC_Message_Sender_Id,
	appId: process.env.NEXT_PUBLIC_App_Id
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const getPlayerBalance = async (userId) => {
	const balanceRef = ref(database, `balances/${userId}`);
	try {
		const snapshot = await get(balanceRef);
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.warn(`User not found for userId ${userId}.`);
			return 1000;
		}
	} catch (error) {
		console.error('Error fetching player balance:', error);
		throw error;
	}
};

export const updatePlayerBalance = async (userId, newBalance) => {
	const balanceRef = ref(database, `balances/${userId}`);
	try {
		await set(balanceRef, newBalance);
	} catch (error) {
		console.error(`Error updating balance for user ${userId}:`, error);
		throw error;
	}
};

export const listenToAuthChanges = (callback) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const userId = user.uid;
			callback(userId);
		} else {
			callback(null);
		}
	});
};

export {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	auth,
	signOut,
	database
};
