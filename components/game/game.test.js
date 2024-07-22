import React from 'react';
import renderer from 'react-test-renderer';
import Game from './Game';

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn()
}));

jest.mock('firebase/auth', () => ({
	getAuth: jest.fn()
}));

jest.mock('firebase/database', () => ({
	getDatabase: jest.fn()
}));

process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key',
process.env.NEXT_PUBLIC_AUTH_DOMAIN = 'test-auth-domain',
process.env.NEXT_PUBLIC_PROJECT_ID = 'test-project-id',
process.env.NEXT_PUBLIC_STORAGE_BUCKET = 'test-storage-bucket',
process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID = 'test-message-sender-id',
process.env.NEXT_PUBLIC_APP_ID =  'test-app-id',

describe('<Game>', () => {
	it('should render component', () => {
		const mockApp = {};
		const mockAuth = {};

		const initializeAppMock = jest.fn(() => mockApp);
		const getAuthMock = jest.fn(() => mockAuth);

		require('firebase/app').initializeApp = initializeAppMock;
		require('firebase/auth').getAuth = getAuthMock;

		const tree = renderer.create(<Game />);
		expect(tree.toJSON()).toMatchSnapshot();
	});
});
