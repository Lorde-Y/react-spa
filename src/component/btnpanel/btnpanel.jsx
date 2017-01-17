import React, { Component, PropTypes } from 'react';

class BtnPanel extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div className='btn-panel'>
				<div>按钮</div>
			</div>
		)
	}
}

export default BtnPanel