import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './App.css';

import fontSelectorReducer from './store/reducers/fontSelector';
import designerReducer from './store/reducers/designer';

import Products from './containers/Products/Products';
import Designer from './containers/Designer/Designer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
	fontSelectorReducer: fontSelectorReducer,
	designerReducer: designerReducer
});

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Provider store={store}>
					<Route path="/" exact component={Products} />
					<Route path="/customize" component={Designer} />
				</Provider>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
