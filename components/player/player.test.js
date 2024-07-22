// Player.test.js

import React from 'react';
import renderer from 'react-test-renderer';
import Player from './Player';

describe('Player component', () => {
	it('renders balance when not loading', () => {
		const component = renderer.create(
			<Player playerId={1} balance={100} bet={10} loading={false} />
		);

		const root = component.root;

		expect(root.findByType('p').children).toEqual(['Balance: $', '100']);
	});
});
