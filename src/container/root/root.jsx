import React, {Component} from 'react';

import Canvas from 'container/canvas';

class Root extends Component {
	render(){
		return (
			<div className='root'>
				<Canvas />
			</div>
		)
	}
}

export default Root