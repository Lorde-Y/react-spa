import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'container/root';

import { AppContainer } from 'react-hot-loader';

import './app.less';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	);
};

render(Root);
// ReactDOM.render(
// 	<Canvas />,
// 	document.getElementById('app')
// );

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./container/root', () => {
		const NewApp = require('./container/root').default;
		console.log(NewApp)
		render(NewApp)
	});
}