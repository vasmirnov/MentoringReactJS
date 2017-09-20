import React from 'react';
import * as s from './searchheader.css';

export class SearchHeader extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            sortBy: 'date'
        };
    }

    render() {
        return (
            <div className={s.searchHeader}>
			    <div className={s.count}>{this.props.count} movies found</div>
				<div className={s.sort}>Sort by 
					<text onClick={() => this.setState({ sortBy: 'date' })}  className={this.state.sortBy=='date' && s.selected}>
						release date
					</text> 
					<text onClick={() => this.setState({ sortBy: 'rating' })} className={this.state.sortBy=='rating' && s.selected}>
						rating
					</text>
                </div>
			</div>
        )
    }
}