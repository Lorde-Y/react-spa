import { CREATE_CMP } from '../constants';

export function createCmp(cmpData) {
	return {
		type: CREATE_CMP,
		cmpData
	}
}