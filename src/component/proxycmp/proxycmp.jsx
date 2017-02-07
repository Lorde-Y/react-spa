import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Draggable from 'component/draggable';
import Resize from 'component/resize';
import ProxyText from 'component/proxytext';

import { addEventsToDocument, removeEventsFromDocument, getMousePosition, pauseEvent } from 'utils/events';


import './proxycmp.less';

class ProxyCmp extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	handleDocumentMouseDown = (e)=> {
		console.log('handling...document')
		const $target = e.target;
		console.log($target)
		if ($target.parentNode === ReactDom.findDOMNode(this) || $target.parentNode.parentNode === ReactDom.findDOMNode(this)){
			return
		}
		const cmpId = parseInt($target.getAttribute('data-id'));
		const { currentCmp } = { ...this.props.data };
		if (currentCmp && currentCmp.includes(cmpId)) {
			return
		}
		const currCmp = cmpId ? [cmpId] : [];
		if (currCmp.length === 0 ) {
			return this.setState({
				isEditing: false
			}, ()=> {
				// const { type, id } = { ...this.props.currCmp };
				const currDom = document.getElementById(`CMP_text_${currentCmp}`);
				if (currDom) {
					currDom.style.display = 'block';
				}
				
				this.props.updateCurrentCmp(currCmp);
			});
		}
		this.props.updateCurrentCmp(currCmp);
	};

	handleMouseDown = (e) => {
		e.stopPropagation();
	};

	handleStart = ()=> {

	};

	handleDrag = ()=> {

	};

	handleStop = (position)=> {
		const { currentCmp, cmps } = {...this.props.data};
		const idx = cmps.findIndex( cmp => cmp.id === currentCmp[0]);
		let { style } = {...cmps[idx]};
		const updateStyle = {
			style: {
				...style,
				left: style.left + position.x,
				top: style.top + position.y
			}
		};
		this.props.updateCmp(updateStyle);
	};

	handleTextEdit = (style)=> {
		this.props.updateCmp(style);
	};

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

	eventsMap() {
		return {
			mousemove: this.handleProxyMove,
			mouseup: this.handleProxyUp
		}
	}

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
				...style,
				left: style.left + position.x,
				top: style.top + position.y
			}
		};
		this.props.updateCmp(updateStyle);
	}


	handleProxyDoubleClick = (e)=> {
		// const proxyText = document.getElementById('proxy-text');
		const { type, id } = { ...this.props.currCmp };
		const currDom = document.getElementById(`CMP_${type}_${id}`);
		currDom.style.display = 'none';
		this.setState({
			isEditing: true
		}, ()=> {
			// let { style } = {...this.props.currCmp};
			// const updateStyle = {
			// 	style: {
			// 		...style,
			// 		display: 'none'
			// 	}
			// };
			// this.props.updateCmp(updateStyle);
		})
	// 	console.log('proxy..click');
	// 	const proxyText = document.getElementById('proxy-text');
	// 	const { type, id } = { ...this.props.currCmp };
	// 	const currDom = document.getElementById(`CMP_${type}_${id}`);
	// 	currDom.style.display = 'none';
	// 	const innerCmp = currDom.querySelector('.cmp-inner');
	// 	const cls = innerCmp.getAttribute('class');

	// 	const cloneNode = innerCmp.cloneNode(true);
		
	// 	let proxyInnerText = proxyText.querySelector('.cmp-inner');
	// 	console.log(proxyInnerText)
	// 	if (!proxyInnerText) {
	// 		proxyText.appendChild(cloneNode)
	// 	}

	// 	proxyInnerText = proxyText.querySelector('.cmp-inner');
	// 	console.log(proxyInnerText)
	// 	proxyInnerText.setAttribute('contenteditable', true);

	// 	proxyInnerText.setAttribute('class', `${cls} edit`)
	// 	const selection = window.getSelection();
	// 	const range = document.createRange();
	// 	range.selectNodeContents(proxyInnerText);
	// 	range.collapse(false);
	// 	selection.removeAllRanges();
	// 	selection.addRange(range);
	// 	document.execCommand('selectAll');

		setTimeout(()=> {
			removeEventsFromDocument(this.eventsMap());
		}, 0)

	};

	render() {
		let { type, style } = {...this.props.currCmp};
		const proxyStyle = {
			position: style.position,
			left: `${style.left + 66}px`,
			top: `${style.top + 76}px`,
			width: style.width,
			height: style.height !== 'auto' ? style.height : type === 'text' ? style.fontSize : style.height
		}
		const active = this.props.active ? 'active' : '';
		return (
			<div 
				className={`proxy ${active}`}  
				style={proxyStyle}
				id='proxy' 
				onMouseDown={this.handleProxyMouseDown}
				onDoubleClick={this.handleProxyDoubleClick}
			>
				<Resize
					active={false}
					position={{x:0,y:0}}
					onDragStart={this.handleStart}
					onDragMove={this.handleDrag}
					onDragStop={this.handleStop}
					onTextEdit={this.handleTextEdit}
					currCmp={this.props.currCmp}
				/>
				<ProxyText
					isEditing={this.state.isEditing}
					currCmp={this.props.currCmp}
				/>
			</div>
		)
	}
}

export default ProxyCmp