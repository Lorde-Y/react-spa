import React, {Component} from 'react';

import { addEventsToDocument, removeEventsFromDocument, getMousePosition, pauseEvent } from 'utils/events';

import './resize.less';

class Resize extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { type, style } = {...this.props.currCmp};
		const resizeStyle = {
			width: style.width,
			height: style.height !== 'auto' ? style.height : type === 'text' ? style.fontSize : style.height
		}
		const active = this.props.active ? 'active' : '';
		return (
			<div 
				id='proxy-resize' 
				className={`proxy-resize ${active}`} 
				style={resizeStyle}
			>
				<div className='handle-resize origin-nw' />
				<div className='handle-resize origin-n' />
				<div className='handle-resize origin-ne'/>
				<div className='handle-resize origin-e' />
				<div className='handle-resize origin-se'/>
				<div className='handle-resize origin-s' />
				<div className='handle-resize origin-sw' />
				<div className='handle-resize origin-w' />
			</div>
		)
	}
}

export default Resize