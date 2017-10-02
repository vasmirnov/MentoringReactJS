import React from 'react';
import * as s from './searchcontrol.css';
import { OptionText } from './OptionText';

export const SEARCH_BY = 'title'

export class SearchControl extends React.PureComponent {
	constructor(...args) {
		super(...args);
		this.state = {
			searchText: ''
		}
		this.searchTextHandler = this.searchTextHandler.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
	}

	searchTextHandler(s) {
		this.setState({
			searchText: s.target.value
		});
	}

	searchHandler(s) {
		this.props.searchHandler(this.state.searchText);
	}

	handleRoute(match) {
		this.setState({
			searchText: match.params.searchText || '',
			searchBy: match.params.searchBy || SEARCH_BY
		});
	}
	componentWillReceiveProps(newprops) {
		if (this.props != newprops) {
			this.handleRoute(newprops.match);
		}
	}
	componentWillMount() {
		this.handleRoute(this.props.match);
	}

	render() {
		return (
			<div className={s.main}>
				<div className={s.hTitle}>netflixroulette</div>
				<div className={s.h1}>Find your movie</div>
				<input className={s.searchText} value={this.state.searchText} onChange={this.searchTextHandler} />
				<div className={s.h2}>
					<div className={s.searchBy}>Search by
						<OptionText selected={this.state.searchBy} value='title' handler={this.props.searchByHandler} baseClass={s.option} selectedClass={s.selected} />
						<OptionText selected={this.state.searchBy} value='director' handler={this.props.searchByHandler} baseClass={s.option} selectedClass={s.selected} />
					</div>
					<button className={s.searchButton} onClick={this.searchHandler}>Search</button>
				</div>
			</div>
		)
	}
};