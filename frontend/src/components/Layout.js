import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => (
	<>
		<Navigation />
		<div className="page-wrap">{children}</div>
		<Footer />
	</>
);

export default Layout;
