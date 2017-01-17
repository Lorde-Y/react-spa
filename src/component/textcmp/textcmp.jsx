import React, {Component} from 'react';

import './textcmp.less';

class TextCmp extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='cmp-inner' style={this.props.innerStyle}>
				{this.props.data.text}
			</div>
		)
	}
}

export default TextCmp