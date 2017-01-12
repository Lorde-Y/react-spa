import React, {Component} from 'react';

import Text from 'component/text';

import styles from './canvas.less';

class Canvas extends Component {
	render() {
		return (
			<div className={styles.canvas} >
				<div style={{fontWeight: "bold"}}>hello world!!!</div>
				<div className={styles.fuck}></div>
				<Text />
			</div>
		)
	}
}

export default Canvas