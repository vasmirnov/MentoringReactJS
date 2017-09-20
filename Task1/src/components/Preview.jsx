import React from 'react';
import * as s from './preview.css';
export class Preview extends React.Component {
    render() {
        return (
            <div className={s.main}>
                <img className={s.img} src={this.props.img}/>
                <div className={s.title}>{this.props.title}</div>
                <div className={s.year}>{this.props.year}</div>
                <div className={s.genre}>{this.props.genre}</div>
            </div>
        )
    }
}