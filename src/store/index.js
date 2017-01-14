import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import * as allReducers from '../reducer';
console.log(allReducers)

if (__dev__) {
	console.log('production...ing.')
}else {
	console.log('fucking.ing.')
}

const rootReducer = combineReducers({
	...allReducers
});

const enhacer = compose(
	applyMiddleware(thunk)
);

const store = createStore(
	rootReducer,
	enhacer
);

export default store



