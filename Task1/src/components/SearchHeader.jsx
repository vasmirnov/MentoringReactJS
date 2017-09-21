import React from 'react';
import { OptionText } from './OptionText';
import * as s from './searchheader.css';

export class SearchHeader extends React.PureComponent {

    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <div className={s.searchHeader}>
                {this.props.director && <div className={s.count}>Films by {this.props.director}</div>}
			    {!this.props.director && <div className={s.count}>{this.props.count} movies found</div>}
				
				<div className={s.sort}>Sort by 
                    <OptionText selected={this.props.sortBy} value='release date' handler={this.props.sortByHandler} baseClass={s.option} selectedClass={s.selected}/>
					<OptionText selected={this.props.sortBy} value='rating' handler={this.props.sortByHandler}  baseClass={s.option} selectedClass={s.selected}/>
                </div>
			</div>
        )
    }
}