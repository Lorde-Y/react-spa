import React, {Component} from 'react';
import ReactDom from 'react-dom';

import { createCmp, updateCurrentCmp, updateCmp } from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Draggable from 'component/draggable';
import Resize from 'component/resize';
import ProxyText from 'component/proxytext';

import { 
	addEventsToDocument,
	removeEventsFromDocument,
	getMousePosition,
	pauseEvent 
} from 'utils/events';

import './proxy.less';

class Proxy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDoubleText: false,
			isEditing: false
		}
	}

	componentDidMount() {
		addEventsToDocument(this.eventsDocumentMap())
	}

	eventsDocumentMap() {
		return {
			mousedown: this.handleDocumentMouseDown
		}
	}

	/**
	 * [handleDocumentMouseDown description]
	 * @param  {[event]}
	 * @description [点击文档区域，判断所点击的dom对象是否为组件]
	 */
	handleDocumentMouseDown = (e)=> {
		const $target = e.target;
		if ($target.parentNode === ReactDom.findDOMNode(this) || $target.parentNode.parentNode === ReactDom.findDOMNode(this)){
			return
		}
		const cmpId = parseInt($target.getAttribute('data-id'));
		const { currentCmp } = { ...this.props.data };
		//点击当前cmp组件
		if (currentCmp && currentCmp.includes(cmpId)) {
			return
		}
		//点击其他cmp组件
		if (cmpId) {
			return this.props.updateCurrentCmp([cmpId]);
		}else {
			//点击的区域不是组件
			let { type, style, id } = {...this.props.currCmp};
			//当该组件是 text组件，并且，是在编辑时，点击其他区域
			if ( type === 'text' && this.state.startDoubleText) {
				return this.setState({
					startDoubleText: false,
					isEditing: false
				}, ()=> {
					//如果是文字组件，之前隐藏的要显示出来
					const currDom = document.getElementById(`CMP_text_${id}`);
					if (currDom) {
						currDom.style.display = 'block';
					}
					this.props.updateCurrentCmp([]);
				});
			}
			//如果一直点击其它区域，不能一直更新currentcmp.
			if (currentCmp.length === 0) {
				return
			}
			this.props.updateCurrentCmp([]);
		}
	};

	handleTextEdit = (data)=> {
		this.setState({
			isEditing: true
		}, ()=> {
			this.props.updateCmp(data);
		})
	};

	eventsMap() {
		return {
			mousemove: this.handleProxyMove,
			mouseup: this.handleProxyUp
		}
	}

	handleProxyMouseDown = (e) => {
		e.stopPropagation();
		const position = getMousePosition(e);
		this.mouseX = position.x;
		this.mouseY = position.y;

		const { type, id } = { ...this.props.currCmp };
		this.currDom = document.getElementById(`CMP_${type}_${id}`);
		this.cmpLeft = this.currDom.style.left.replace('px', '');
		this.cmpTop = this.currDom.style.top.replace('px', '');

		this.proxy = document.getElementById('proxy');
		this.proxyLeft = this.proxy.style.left.replace('px', '');
		this.proxyTop = this.proxy.style.top.replace('px', '');

		addEventsToDocument(this.eventsMap())
	};

	handleProxyMove = (e)=> {
		pauseEvent(e);
		
		const position = getMousePosition(e);

		const disX = position.x - this.mouseX;
		const disY = position.y - this.mouseY;
		
		this.currDom.style.left = `${parseInt(this.cmpLeft) + disX}px`;
		this.currDom.style.top = `${parseInt(this.cmpTop) + disY}px`;

		this.proxy.style.left = `${parseInt(this.proxyLeft) + disX}px`;
		this.proxy.style.top = `${parseInt(this.proxyTop) + disY}px`;

		// console.log(disX,disY);
		// if (Math.abs(position.x - this.mouseX) > 2 || Math.abs(position.y - this.mouseY) > 2) {
		// 	this.setState({startDrag: true, dragPosition: position});
		// }
	};

	handleProxyUp = (e)=> {
		pauseEvent(e);
		const position = getMousePosition(e);
		const disX = position.x - this.mouseX;
		const disY = position.y - this.mouseY;
		this.updateCmpPosition({
			x: position.x - this.mouseX,
			y: position.y - this.mouseY
		});
		removeEventsFromDocument(this.eventsMap());
	};

	updateCmpPosition(position) {
		let { style } = {...this.props.currCmp};
		const updateStyle = {
			style: {
				left: style.left + position.x,
				top: style.top + position.y
			}
		};
		this.props.updateCmp(updateStyle);
	}

	handleProxyDoubleClick = (e)=> {
		const { type, id } = { ...this.props.currCmp };
		if (type !== 'text') {
			return
		}
		//双击之后，当前的文字组件设置为隐藏状态
		const currDom = document.getElementById(`CMP_${type}_${id}`);
		currDom.style.display = 'none';

		this.setState({startDoubleText: true});

		setTimeout(()=> {
			removeEventsFromDocument(this.eventsMap());
		}, 0)
	};

	getCanvasArea() {
		const { type, id, style } = { ...this.props.currCmp };
		const canvasDom = document.getElementById('canvas');
		let offsetLeft = null;
		let offsetTop = null;
		if (canvasDom) {
			let { left, top } = canvasDom.getBoundingClientRect();
			offsetLeft = left;
			offsetTop = top;
		}
		return {
			position: style.position,
			left: offsetLeft ? offsetLeft + style.left : 0,
			top: offsetTop ? offsetTop + style.top : 0,
			width: style.width,
			height: style.height !== 'auto' ? style.height : type === 'text' ? style.fontSize : style.height
		}
	}

	render() {
		const proxyStyle = this.getCanvasArea();
		return (
			<div 
				className='proxy'  
				style={proxyStyle}
				id='proxy' 
				onMouseDown={this.handleProxyMouseDown}
				onDoubleClick={this.handleProxyDoubleClick}
			>
				<Resize
					active={this.props.showResize}
					currCmp={this.props.currCmp}
				/>
				<ProxyText
					startDoubleText={this.state.startDoubleText}
					isEditing={this.state.isEditing}
					handleTextEdit={this.handleTextEdit}
					currCmp={this.props.currCmp}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let { currentCmp, cmps } = {...state.page};
	cmps = cmps ? cmps : [];
	const idx = cmps.findIndex( cmp => cmp.id === currentCmp[0]);
	const showResize = idx !== -1 ? true : false;
	const defaultCmp = {
		type: null,
		style: {
			position: 'absolute',
			left: 0,
			top: 0,
			width: 0,
			height: 0
		}
	};
	return {
		data: state.page,
		currCmp: showResize ? cmps[idx] : defaultCmp,
		showResize: showResize
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateCmp,
		updateCurrentCmp
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Proxy)