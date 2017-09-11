import React from 'react';

export class Dropdown extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            isOpened: false
        };
    }

    render() {
        return (
            <div>
                <div onClick={() => this.setState({ isOpened: !this.state.isOpened })}>Switch</div>
                {this.state.isOpened && <div>Content</div>}
            </div>
        )
    }
}