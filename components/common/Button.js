import React from 'react';
const Button = ({ label, onClick }) => {
	return (
		<button className={'btn btn-outline-info px-4 w-20'} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
