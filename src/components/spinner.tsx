import React from "react";
import "./spinner.css"; // Ensure you have a CSS file for styling the spinner

const Spinner: React.FC = () => {
	return (
		<div className='spinner'>
			<div className='spinner-circle'></div>
		</div>
	);
};

export default Spinner;
