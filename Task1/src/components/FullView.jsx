import React from 'react';
import * as s from './fullview.css';

export class FullView extends React.PureComponent {

	getRateClass(){
		if (this.props.film.rating >= 4) { return s.ratingGreen;}
		if (this.props.film.rating >= 3) { return s.ratingYellow;}
		return s.ratingRed;
	}
	render() {
		return (
			<div className={s.main}>
				<div className={s.hTitle}>netflixroulette</div>
				<button className={s.searchButton} onClick={this.props.unselectFilmHandler}>Search</button>
				<div className={s.content}>
					<img className={s.img} src={this.props.film.img}/>
					<div className={s.info}>
						<div className={s.title}>{this.props.film.title}</div>
						<div className={s.rating + " " + this.getRateClass()}>{this.props.film.rating}</div>
						<div className={s.genre}>{this.props.film.genre}</div>
						<div className={s.year}>{this.props.film.year}</div>
						<div className={s.timing}>{this.props.film.timing} min</div>
						<div className={s.description}>{this.props.film.description}</div>
						<div className={s.director}>Director: {this.props.film.director}</div>
						<div className={s.cast}>Cast: {this.props.film.cast}</div>
					</div>
				</div>
			</div>
		)
	}
};