import { render } from '@testing-library/react';
import { Alert } from './Alert';

jest.mock('alertifyjs', () => ({
	notify: jest.fn()
}));

describe('Alert component', () => {
	it('calls alertify.notify with correct arguments', () => {
		const message = 'Hello!';
		const type = 'success';

		render(<Alert message={message} type={type} />);

		expect(require('alertifyjs').notify).toHaveBeenCalledWith(
			message,
			type,
			3
		);
	});
});
