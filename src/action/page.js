import { TO_DO } from '../constants';


export function toDoList() {
	console.log('dispathc...action.')
	return {
		type: TO_DO,
		data: 'learn...react..ing..ing..'
	}
}