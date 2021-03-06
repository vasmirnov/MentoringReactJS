import React from 'react';
import { Preview } from './Preview';

export class SearchResults extends React.Component {

    render() {
        return (
            <div>
                {this.props.films.map((film) =>
                    <Preview key={film.get("id")} film={film} selectFilmHandler={this.props.selectFilmHandler} />
                )}
            </div>
        )
    }
}