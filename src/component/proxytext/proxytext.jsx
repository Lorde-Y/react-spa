import React, {Component} from 'react';

import './proxytext.less';

const EditText = ({isEditing, text, style})=> (
	<div className={`cmp-inner ${isEditing}`} style={style}>
		{text}
	</div>
);

class ProxyText extends Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	handleTextMouseDown = (e)=> {
		e.stopPropagation();
	};

	// handleKeyUp = (e)=> {
	// 	pauseEvent(e);
	// 	const proxyText = document.getElementById('proxy-text');
	// 	const proxyInnerText = proxyText.querySelector('.cmp-inner');
	// 	console.log(proxyInnerText.offsetHeight)
	// 	const editText = proxyInnerText.innerText;
	// 	const editHeight = proxyInnerText.offsetHeight;
	// 	let cmpStyle = {
	// 		style: {
				
	// 		}
	// 	};
	// 	let { type, text, style } = {...this.props.currCmp};
	// 	if ( text !== editText) {
	// 		cmpStyle.text = editText;
	// 	}
	// 	if ( editHeight !== style.height) {
	// 		cmpStyle.style.height = editHeight;
	// 	}
	// 	console.log(cmpStyle)
	// 	// this.props.onTextEdit(cmpStyle);
	// 	// let { type, style } = {...this.props.currCmp};
	// 	// console.log(this.props.)
	// };
	selectTextAll() {
		if (this.props.isEditing) {
			setTimeout(()=> {
				const proxyText = document.getElementById('proxy-text');
				let proxyInnerText = proxyText.querySelector('.cmp-inner');
				proxyInnerText.setAttribute('contenteditable', true);
				if (proxyInnerText) {
					const selection = window.getSelection();
					const range = document.createRange();
					range.selectNodeContents(proxyInnerText);
					range.collapse(false);
					selection.removeAllRanges();
					selection.addRange(range);
					document.execCommand('selectAll');
				}
			}, 20);
		}
	}

	render() {
		let { text, style } = {...this.props.currCmp};
		style = {
			...style,
			position: 'absolute',
			left: 0,
			top: 0
		};
		return (
			<div 
				className='proxy-text'
				id='proxy-text'
				// onKeyUp={this.handleKeyUp}
				// onDoubleClick={this.handleDoubleClick}
				onMouseDown={this.handleTextMouseDown}
			>
				{ this.props.isEditing &&
					<EditText
						isEditing={false}
						text={text}
						style={style}
					/>
				}
				{ this.selectTextAll() }
			</div>
		)
	}
}

export default ProxyText