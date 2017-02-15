import React, { Component } from 'react';

import './sidetool.less';

class SideTool extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='canvas-sidetool'>
				<div className='sidetool-undo'>
					撤销
				</div>
				<div className='sidetool-redo'>
					重做
				</div>
			</div>
		)
	}
}

export default SideTool