import { TO_DO } from '../constants';

export function getToDo(state={}, action) {
	switch(action.type) {
		case TO_DO:
			console.log('dddddd')
			return {
				...state,
				frist: 'wirte it down'
			};
		default:
			return state;
	}
}