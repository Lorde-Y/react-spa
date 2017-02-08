import React, {Component} from 'react';
import { pauseEvent } from 'utils/events';

import './proxytext.less';

const EditText = ({text, style})=> (
	<div className={`cmp-inner edit`} style={style}>
		{text}
	</div>
);

class ProxyText extends Component {
	constructor(props) {
		super(props);
	}

	handleTextMouseDown = (e)=> {
		e.stopPropagation();
	};

	handleKeyUp = (e)=> {
		pauseEvent(e);

		const proxyText = document.getElementById('proxy-text');
		const proxyInnerText = proxyText.querySelector('.cmp-inner');
		const editText = proxyInnerText.innerText;
		const editHeight = proxyInnerText.offsetHeight;
		let cmpStyle = {
			text: editText,
			style: {
				height: editHeight
			}
		};
		let { type, text, style } = {...this.props.currCmp};
		if ( text === editText) {
			return
		}
		this.props.handleTextEdit(cmpStyle);
	};

	selectTextAll() {
		if (this.props.startDoubleText && !this.props.isEditing) {
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
			top: 0,
			height: 'auto'
		};
		return (
			<div 
				className='proxy-text'
				id='proxy-text'
				onKeyUp={this.handleKeyUp}
				onMouseDown={this.handleTextMouseDown}
			>
				{ this.props.startDoubleText &&
					<EditText
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