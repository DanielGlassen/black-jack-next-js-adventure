import React from 'react';
import css from 'styles/Input.module.css';

const Input = ({ htmlFor, label, type, autoFocus, value, onChange, err }) => {
	return (
		<div className={css.inputWrapper}>
			<label htmlFor={htmlFor} className={css.label}>
				{label}
			</label>
			<input
				type={type}
				id={htmlFor}
				autoFocus={autoFocus}
				className={`${css.input} ${err ? css.inputError : ''}`}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{err && <p className={css.error}>{err}</p>}
		</div>
	);
};

export default Input;
