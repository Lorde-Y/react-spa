import { TO_DO } from '../constants';

export function getToDo(state={}, action) {
	switch(action.type) {
		case TO_DO:
			return {
				...state,
				frist: 'wirte it down'
			};
		default:
			return state;
	}
}