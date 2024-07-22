import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/bootstrap.css';

export const Alert = ({ message, type }) => {
	const alertify = require('alertifyjs');

	if (typeof window !== 'undefined') {
		// Check if window object is defined (to avoid SSR issues)
		alertify.notify(message, type, 3);
	}

	return null;
};
