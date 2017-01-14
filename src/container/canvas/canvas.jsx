import React, {Component} from 'react';
import * as actionCreators from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Text from 'component/text';

// import styles from './canvas.less';
import './canvas.less';

class Canvas extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}
	handleCanvasClick = (e)=> {
		this.props.toDoList();
	};
	render() {
		return (
			<div className='canvas' onClick={this.handleCanvasClick}>
				<div style={{fontWeight: "bold"}}>Hello world,hello React!</div>
				<Text />
			</div>
		)
	}
}

function mapStateToProps(state={}) {
	return {
		data: {...state}
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		...actionCreators
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)