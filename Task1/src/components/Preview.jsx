import React from 'react';
import * as s from './preview.css';
export class Preview extends React.PureComponent {
    constructor(...args) {
        super(...args);

        this.selectFilmHandler = this.selectFilmHandler.bind(this);
    }
    selectFilmHandler(film) {
        this.props.selectFilmHandler(this.props.film);
    }

    render() {
        return (
            <div className={s.main} onClick={this.selectFilmHandler}>
				<img className={s.img} src={this.props.film.img}/>
				<div className={s.title}>{this.props.film.title}</div>
                <div className={s.year}>{this.props.film.year}</div>
                <div className={s.genre}>{this.props.film.genre}</div>
            </div>
        )
    }
}