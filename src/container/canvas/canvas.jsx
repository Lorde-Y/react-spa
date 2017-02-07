import React, {Component} from 'react';
import { createCmp, updateCurrentCmp, updateCmp } from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProxyCmp from 'component/proxycmp';

import { addEventsToDocument } from 'utils/events';

import Enhancer from 'component/enhancer';
import TextCmp from 'component/textcmp';

import './canvas.less';

const canvasCmps = {
	text: Enhancer(TextCmp),
	image: Enhancer(TextCmp),
	btn: Enhancer(TextCmp)
};

class Canvas extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	eventsMap() {
		return {
			mousedown: this.handleCanvasMouseDown,
			click: this.handleDocumentClick
		}
	}

	handleCanvasMouseDown = (e)=> {
		
	};

	renderCmps() {
		const { cmps } = { ...this.props.data };
		return cmps.map((item, id)=> {
			const Cmp = canvasCmps[item.type];
			return (
				<Cmp
					key={id}
					type={item.type}
					cmpData={item}
				/>
			)
		})
	}

	renderProxy() {
		const { currentCmp, cmps } = {...this.props.data};
		const idx = cmps.findIndex( cmp => cmp.id === currentCmp[0]);
		const showResize = idx !== -1 ? true : false;
		let currCmp = {
			type: null,
			style: {
				position: 'absolute',
				left: 0,
				top: 0,
				width: 0,
				height: 0
			}
		};
		if (showResize) {
			currCmp = cmps[idx];
		}
		return (
			<ProxyCmp
				updateCurrentCmp={this.props.updateCurrentCmp}
				updateCmp={this.props.updateCmp}
				currCmp={currCmp}
				data={this.props.data}
			/>
		)
	}

	render() {
		return (
			<div className='canvas-container' onMouseDown={this.handleCanvasMouseDown}>
				<div className='canvas' id='canvas'>
					{ this.renderCmps() }
				</div>
				<div>
					{ this.renderProxy() }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state={}) {
	return {
		data: state.page
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createCmp,
		updateCurrentCmp,
		updateCmp
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)