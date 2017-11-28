import React from 'react';
import * as s from './preview.css';
import defaultImg from '../img/default.jpg';


export class Preview extends React.PureComponent {
    constructor(...args) {
        super(...args);

        this.selectFilmHandler = this.selectFilmHandler.bind(this);
    }
    selectFilmHandler(film) {
        this.props.selectFilmHandler(this.props.film.get("id"));
    }

    getImageLing(film) {
        var img = film.get("img");
        return img && "https://image.tmdb.org/t/p/w300" + film.get("img") || defaultImg;
    }
    render() {
        return (
            <div className={s.main} onClick={this.selectFilmHandler}>
                <img className={s.img} src={this.getImageLing(this.props.film)} />
                <div className={s.title}>{this.props.film.get("title")}</div>
                <div className={s.year}>{this.props.film.get("year")}</div>
                <div className={s.genre}>{this.props.film.get("genre")}</div>
            </div>
        )
    }
}