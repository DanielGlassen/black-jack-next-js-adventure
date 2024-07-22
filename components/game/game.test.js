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

process.env.NEXT_PUBLIC_Firebase_API_Key = 'test-api-key';
process.env.NEXT_PUBLIC_Auth_Domain = 'test-auth-domain';
process.env.NEXT_PUBLIC_Project_Id = 'test-project-id';
process.env.NEXT_PUBLIC_Storage_Bucket = 'test-storage-bucket';
process.env.NEXT_PUBLIC_Message_Sender_Id = 'test-message-sender-id';
process.env.NEXT_PUBLIC_App_Id = 'test-app-id';

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
