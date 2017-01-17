import React, {Component} from 'react';
import * as actionCreators from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

	renderCmps() {
		const { cmps } = { ...this.props.data };
		return cmps.map((item, id)=> {
			const Cmp = canvasCmps[item.type];
			return (
				<Cmp
					key={id}
					type={item.type}
					data={item}
				/>
			)
		})
	}

	render() {
		return (
			<div className='canvas-container'>
				<div className='canvas'>
					{ this.renderCmps() }
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
		...actionCreators
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)