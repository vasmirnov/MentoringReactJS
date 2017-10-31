import React from 'react';
import * as s from './fullview.css';

export class FullView extends React.PureComponent {

	getRateClass(){
		if (this.props.film.rating >= 4) { return s.ratingGreen;}
		if (this.props.film.rating >= 3) { return s.ratingYellow;}
		return s.ratingRed;
	}

	renderSafe() {
		return (
			<div> 
				<div className={s.hTitle}>netflixroulette</div>
				<button className={s.searchButton} onClick={this.props.unselectFilmHandler}>Search</button>
				<div className={s.content}>
					<img className={s.img} src={"https://image.tmdb.org/t/p/w300" + this.props.film.get("img")}/>
					<div className={s.info}>
						<div className={s.title}>{this.props.film.get("title")}</div>
						<div className={s.rating + " " + this.getRateClass()}>{this.props.film.get("rating")}</div>
						<div className={s.genre}>{this.props.film.get("genre")}</div>
						<div className={s.year}>{this.props.film.get("year")}</div>
						<div className={s.timing}>{this.props.film.get("timing")} min</div>
						<div className={s.description}>{this.props.film.get("description")}</div>
						<div className={s.director}>Director: {this.props.film.get("director")}</div>
						<div className={s.cast}>Cast: {this.props.film.get("cast")}</div>
					</div>
				</div>
			</div> 
		);
	}

	render() {
		return (
			<div className={s.main}>
				{this.props.film && this.renderSafe()}
			</div>
		)
	}
};