import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import ActorsPage from "./pages/actors/actorspage.component";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={ActorsPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
