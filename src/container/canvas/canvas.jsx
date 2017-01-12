import React, {Component} from 'react';

import Text from 'component/text';

// import styles from './canvas.less';
import './canvas.less';

class Canvas extends Component {
	render() {
		return (
			<div className='canvas' >
				<div style={{fontWeight: "bold"}}>Hello world,hello React!</div>
				<Text />
			</div>
		)
	}
}

export default Canvas