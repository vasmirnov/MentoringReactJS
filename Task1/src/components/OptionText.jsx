import React from 'react';

export class OptionText extends React.PureComponent {

    constructor(...args) {
        super(...args);
        this.handler = this.handler.bind(this);
    }
    handler(s) {
        this.props.handler(this.props.value)
    }

    isSelected(props) {
        var thisSelected = (props.selected == props.value);
        var useDefault = (!props.selected && props.default);
        return thisSelected || useDefault;
    }

    render() {
        return (
            <text onClick={this.handler} className={this.props.baseClass + ' ' + (this.isSelected(this.props) && this.props.selectedClass)}>
                {this.props.value}
            </text>
        )
    }
};