import React from 'react';
import * as s from './searchcontrol.css';
import { OptionText } from './OptionText';

export class SearchControl extends React.PureComponent {
	render() {
		return (
			<div className={s.main}>
				<div className={s.hTitle}>netflixroulette</div>
				<div className={s.h1}>Find your movie</div>
				<input className={s.searchText}></input>
				<div className={s.h2}>
					<div className={s.searchBy}>Search by 
						<OptionText selected={this.props.searchBy} value='title' handler={this.props.searchByHandler} baseClass={s.option} selectedClass={s.selected}/>
						<OptionText selected={this.props.searchBy} value='director' handler={this.props.searchByHandler}  baseClass={s.option} selectedClass={s.selected}/>
					</div>
					<button className={s.searchButton}>Search</button>
				</div>
			</div>
		)
	}
};