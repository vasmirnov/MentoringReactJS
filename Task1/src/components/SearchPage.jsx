import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../action_creators';

import * as s from './searchpage.css';
//import SearchControl from './SearchControl';
//import SEARCH_BY  from './SearchControl';
import { SearchControl, SEARCH_BY } from './SearchControl';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from './SearchResults';
import { FullView } from './FullView';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import * as actionCreators from '../action_creators';

export const SORT_BY = 'release date'

export class SearchPage extends React.PureComponent {

    constructor(...args) {
        super(...args);
        this.searchByHandler = this.searchByHandler.bind(this);
        this.renderSearchControl = this.renderSearchControl.bind(this);
        this.renderFullView = this.renderFullView.bind(this);
    }

    setHistory(x) {
        var newPath;
        if (x.selectedFilm) {
            newPath = '/film/' + x.sortBy + '/' + x.selectedFilm.get("id");
        } else {
            newPath = '/search/' + x.searchBy + '/' + x.sortBy + '/' + x.searchText;
        }
        if (this.props.history.location.pathname != newPath) {
            this.props.history.push(newPath);
        }
    }

    searchByHandler(s) {
        this.setHistory({ searchBy: s })
    }

    componentWillMount() {
        if (this.props.inited) {
            this.setHistory(this.props)
        } else {
            this.props.init(this.props.match.params)
        }
    }

    componentWillReceiveProps(newprops) {
        if (this.props != newprops) {
            this.setHistory(newprops)
        }
    }

    renderSearchControl(props) {
        return (
            <SearchControl
                searchText={this.props.searchText}
                searchBy={this.props.searchBy}
                searchHandler={this.props.startSearchRequest}
                searchByHandler={this.searchByHandler} />

        )
    }
    renderFullView(props) {
        return (
            <FullView
                film={this.props.selectedFilm}
                unselectFilmHandler={this.props.clearFilmDetails} />
        )
    }

    render() {
        return (
            <div className={s.main}>
                <Switch>
                    <Route path="/search/:searchBy?/:sortBy?/:searchText?" component={this.renderSearchControl} />
                    <Route path="/film/:id" component={this.renderFullView} />
                    <Route path="/" component={this.renderSearchControl} />
                </Switch>
                <SearchHeader count={this.props.count} sortBy={this.props.sortBy} film={this.props.selectedFilm} sortByHandler={this.props.startSortRequest} />
                <SearchResults films={this.props.films} selectFilmHandler={this.props.startFetchFilmRequest} />
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        inited: state.get('inited') || false,
        searchBy: state.get('searchBy') || SEARCH_BY,
        sortBy: state.get('sortBy') || SORT_BY,
        searchText: state.get('searchText') || '',
        films: state.get('films') || [],
        count: state.get('count') || 0,
        selectedFilm: state.get('selectedFilm')
    };
}

export const SearchPageContainer = connect(mapStateToProps, actionCreators)(SearchPage); 