import { CREATE_CMP, UPDATE_CURRENT_CMP, UPDATE_CMP } from '../constants';

const initState = {
	id: 1000,
	currentCmp: [],
	cmps: []
};

function toUpdateCmp(state, action) {
	let { currentCmp, cmps } = {...state};
	const idx = cmps.findIndex(cmp => cmp.id === currentCmp[0]);
	if (idx === -1) {
		return state
	}
	let currCmp = { ...cmps[idx] };
	const updateData = { ...action.data };
	for (let key in updateData) {
		if ({}.hasOwnProperty.call(currCmp, key)) {
			if (typeof updateData[key] === 'object') {
				currCmp[key] = {
					...currCmp[key],
					...updateData[key]
				};
			}else {
				currCmp[key] = updateData[key];
			}
		}
		else {
			currCmp[key] = updateData[key];
		}
	}
	cmps[idx] = {...currCmp};
	return {
		...state,
		cmps
	}
}

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
			}
		case UPDATE_CURRENT_CMP:
			return {
				...state,
				currentCmp: [...action.cmpId]
			}
		case UPDATE_CMP:
			const updateCmp = toUpdateCmp(state, action);
			return {
				...updateCmp
			}
		default:
			return state;
	}
}