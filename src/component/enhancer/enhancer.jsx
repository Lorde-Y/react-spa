import React, {Component} from 'react';

export default function Enhancer(Cmp) {
	class EnhancerCmp extends Component {
		constructor(props) {
			super(props);
		}
		render() {
			const { style } = {...this.props.data};
			const { position, left, top, ...others } = {...style};
			const outerStyle = {
				position: position,
				left: `${left}px`,
				top: `${top}px`
			}; 
			return (
				<div className={`wrapper-cmp cmp-${this.props.type}`} style={outerStyle}>
					<Cmp
						data={this.props.data}
						innerStyle={{...others}}
					/>
				</div>
			)
		}
	}
	return EnhancerCmp
}