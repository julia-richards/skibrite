import React from "react";

const Footer = () => {
	return (
		<footer
			className="Footer"
			style={{ width: "100%", backgroundColor: "darkblue" }}
		>
			<p style={{ textAlign: "center", color: "white" }}>
				All rights reservered {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
