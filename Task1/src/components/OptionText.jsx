import React from 'react';

export class OptionText extends React.PureComponent {

	constructor(...args) {
		super(...args);
		this.handler = this.handler.bind(this);
    }
    handler(s) {
        this.props.handler(this.props.value)
    }

	render() {
		return (
			<text onClick={this.handler}  className={this.props.baseClass + ' '+ ((this.props.selected == this.props.value) && this.props.selectedClass)}>
				{this.props.value}
			</text>
		)
	}
};