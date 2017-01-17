import React, {Component} from 'react';
import Element from 'container/element';
import Canvas from 'container/canvas';

class Root extends Component {
	render(){
		return (
			<div className='root'>
				<Element />
				<Canvas />
			</div>
		)
	}
}

export default Root