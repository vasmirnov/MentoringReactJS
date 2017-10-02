import React from 'react';
import * as s from './searchpage.css';
import { SearchControl } from './SearchControl';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from './SearchResults';
import { FullView } from './FullView';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { filmsData } from './filmsData';

const SEARCH_BY = 'title'
const SORT_BY = 'release date'


export class SearchPage extends React.PureComponent {

    constructor(...args) {
        super(...args);
        this.state = {
            count: 7,
            searchBy: SEARCH_BY,
            sortBy: SORT_BY,
            searchText: '',
            films: filmsData || []
        };

        this.searchByHandler = this.searchByHandler.bind(this);
        this.selectFilmHandler = this.selectFilmHandler.bind(this);
        this.unselectFilmHandler = this.unselectFilmHandler.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
        this.searchTextHandler = this.searchTextHandler.bind(this);
        this.renderSearchControl = this.renderSearchControl.bind(this);
        this.renderFullView = this.renderFullView.bind(this);
    }

    setStateAndHistory(newState) {
        var x = Object.assign(this.state, newState)
        var newPath;
        if (x.selectedFilm) {
            newPath = '/film/' + x.sortBy + '/' + x.selectedFilm.id;
        } else {
            newPath = '/search/' + x.searchBy + '/' + x.sortBy + '/' + x.searchText;
        }
        if (this.props.history.location.pathname != newPath) {
            this.props.history.push(newPath);
        }
    }

    searchTextHandler(s) {
        this.setStateAndHistory({
            searchText: s
        })
    }

    searchByHandler(s) {
        this.setStateAndHistory({
            searchBy: s
        })
    }

    sortByHandler(s) {
        this.setStateAndHistory({
            sortBy: s
        })
    }

    selectFilmHandler(film) {
        this.setStateAndHistory({
            selectedFilm: film
        })
    }

    unselectFilmHandler() {
        this.setStateAndHistory({
            selectedFilm: null
        });
    }

    handleRoute(match) {
        var newState = {
            searchBy: match.params.searchBy || SEARCH_BY,
            searchText: match.params.searchText || '',
            sortBy: match.params.sortBy || SORT_BY,
            selectedFilm: match.path.startsWith('/film') && this.state.films.find((e) => (e.id == match.params.id))

        };
        newState.films = this.searchFilms(newState);
        this.setState(newState);
    }

    searchFilms(newState) {
        var films = filmsData;
        if (newState.selectedFilm) {
            films = films.filter((e) => (e.director === newState.selectedFilm.director));
        } else if (newState.searchText) {
            if (newState.searchBy == 'director') {
                films = films.filter((e) => (e.director.indexOf(newState.searchText) >= 0));
            } else {
                films = films.filter((e) => (e.title.indexOf(newState.searchText) >= 0));
            }
        }
        var comparator;
        if (newState.sortBy == 'rating') {
            comparator = (a, b) => (+(a.rating > b.rating) || +(a.rating === b.rating) - 1);
        } else {
            comparator = (a, b) => (+(a.year > b.year) || +(a.year === b.year) - 1);
        }
        return films.sort(comparator);
    }

    componentWillMount() {
        this.handleRoute(this.props.match)
    }

    componentWillReceiveProps(newprops) {
        if (this.props != newprops) {
            this.handleRoute(newprops.match)
        }
    }

    renderSearchControl(props) {
        return (
            <SearchControl {...props}
                searchHandler={this.searchTextHandler}
                searchByHandler={this.searchByHandler} />

        )
    }
    renderFullView(props) {
        return (
            <FullView {...props}
                film={this.state.selectedFilm}
                unselectFilmHandler={this.unselectFilmHandler} />
        )
    }

    render() {
        return (
            <div className={s.main}>
                <Switch>
                    <Route path="/" component={this.renderSearchControl} />
                    <Route path="/search/:searchBy?/:sortBy?/:searchText?" component={this.renderSearchControl} />
                    <Route path="/film/:id" component={this.renderFullView} />
                </Switch>
                <SearchHeader count={this.state.films.length} sortBy={this.state.sortBy} film={this.state.selectedFilm} sortByHandler={this.sortByHandler} />
                <SearchResults films={this.state.films} selectFilmHandler={this.selectFilmHandler} />
            </div >
        )
    }
}

