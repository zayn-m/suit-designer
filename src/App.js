import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import Products from './containers/Products/Products';
import Designer from './containers/Designer/Designer';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Products} />
				<Route path="/customize" component={Designer} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
