import React from "react";

// routes
import Router from "./routes";

// theme
import ThemeConfig from "./theme";

// components
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<ThemeConfig>
			<ScrollToTop />
			<Router />
		</ThemeConfig>
	)
}

export default App
