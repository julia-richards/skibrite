import React from "react";

const Footer = () => {
	return (
		<footer
			className="Footer"
			style={{
				width: "100%",
				backgroundColor: "var(--dark-blue)",
				padding: "1rem 2rem",
			}}
		>
			<p
				style={{
					textAlign: "center",
					color: "var(--light-blue)",
					fontSize: 16,
				}}
			>
				All rights reserved {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
