import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../action_creators';

import * as s from './searchpage.css';
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
        this.sortByHandler = this.sortByHandler.bind(this);
        this.searchTextHandler = this.searchTextHandler.bind(this);
        this.renderSearchControl = this.renderSearchControl.bind(this);
        this.renderFullView = this.renderFullView.bind(this);
    }

    setStateAndHistory(x) {
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

    componentWillMount() {
        this.setStateAndHistory(this.props)
    }

    componentWillReceiveProps(newprops) {
        if (this.props != newprops) {
            this.setStateAndHistory(newprops)
        }
    }

    renderSearchControl(props) {
        console.log("searchText: " + this.props);
        return (
            <SearchControl
                searchText = {this.props.searchText}
			    searchBy = {this.props.searchBy}
                searchHandler = {this.props.startSearchRequest}
                searchByHandler = {this.searchByHandler} />

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
                <SearchHeader count={this.props.films.size} sortBy={this.props.sortBy} film={this.props.selectedFilm} sortByHandler={this.props.startSortRequest} />
                <SearchResults films={this.props.films} selectFilmHandler={this.props.startFetchFilmRequest}/>
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        searchBy: state.get('searchBy')|| SEARCH_BY,
        sortBy: state.get('sortBy')|| SORT_BY,
        searchText: state.get('searchText') || '',
        films: state.get('films') || [],
        selectedFilm: state.get('selectedFilm')
    };
  }

export const SearchPageContainer =  connect(mapStateToProps, actionCreators)(SearchPage); 