import React from 'react';
import * as s from './searchcontrol.css';

export class SearchControl extends React.Component {
	render() {
		return (
			<div className={s.searchHeader}>
				<div className={s.name}>netflixroulette</div>
				<div className={s.h1}>Find your movie</div>
				<input className={s.searchText}></input>
				<div className={s.h2}>
					<div className={s.searchBy}>Search by 
					<text onClick={() => this.props.searchByHandler('title')}  className={s.option + ' '+ (this.props.searchBy=='title' && s.selected)}>
						Title
					</text> 
					<text onClick={() => this.props.searchByHandler('director')} className={s.option + ' '+ (this.props.searchBy=='director' && s.selected)}>
						Director
					</text>
					</div>
					<button className={s.searchButton}>Search</button>
				</div>
			</div>
		)
	}
};