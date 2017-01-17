import { CREATE_CMP } from '../constants';

const initState = {
	id: 1000,
	currentCmp: [],
	cmps: []
};

export function page(state=initState, action) {
	switch(action.type) {
		case CREATE_CMP:
			let { id, currentCmp, cmps } = { ...state };
			id++;
			return {
				...state,
				id: id,
				currentCmp: [id],
				cmps: [...cmps, {
					id,
					...action.cmpData
				}]
			};
		default:
			return state;
	}
}