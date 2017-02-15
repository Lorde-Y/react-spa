import React, { Component } from 'react';

const action = {
	type: 'fuck'
};
export function undoable(reducer) {
	console.log(reducer)
	return function(initalState, action) {
		// return initalState
		return {
			id: 1000,
			currentCmp: [],
			cmps: []
		}
	}
}