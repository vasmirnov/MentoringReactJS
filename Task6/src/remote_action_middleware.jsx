import { receiveFilmDetails, receiveFilmsList, startFetchFilmRequest, startSearchRequest } from './action_creators';
import { api_key } from './api_key';
import { setGenres, setList, setCredits, setDetails } from './responce_mappers';
import fetch from 'isomorphic-fetch';

const getFilmCredits = (movieId, selectedFilm) => fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`)
    .then(response => response.json())
    .then(json => setCredits(json, selectedFilm))

const getFilmDetails = (store, movieId) => fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
    .then(response => response.json())
    .then(json => setDetails(json))
    .then(selectedFilm => getFilmCredits(movieId, selectedFilm))
    .then(selectedFilm => receiveFilmDetails(selectedFilm))
    .then(action => store.dispatch(action))
    .catch(err => { throw err })

const searchFilms = (q, genres, sortBy) => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${q}&sort_by=${sortBy}`)
    .then(response => response.json())
    .then(json => setList(json, genres))
    .then(list => receiveFilmsList(list))

const discoverFilms = (sortBy, genres, directorId) => fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=${sortBy}${directorId && ("&with_crew=" + directorId) || ""}`)
    .then(response => response.json())
    .then(json => setList(json, genres))
    .then(list => receiveFilmsList(list))

const getList = (store, text, sortBy, directorId) => fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
    .then(response => response.json())
    .then(json => setGenres(json))
    .then(genres => text && searchFilms(text, genres, sortBy) || discoverFilms(sortBy, genres, directorId))
    .then(action => store.dispatch(action))
    .catch(err => { throw err })

function normailzeSortBy(sortBy) {
    sortBy = (sortBy == "release date") && "release_date.desc" || sortBy;
    sortBy = (sortBy == "rating") && "vote_average.desc" || sortBy;
    sortBy = sortBy || "release_date.desc";
    return sortBy;
}

export const remoteActionMiddleware = store => next => action => {
    console.log('in middleware', action);
    switch (action.type) {
        case "INIT": {
            if (action.state.selectedFilmId) {
                store.dispatch(startFetchFilmRequest(action.state.selectedFilmId));
            } else {
                store.dispatch(startSearchRequest(action.state.searchText));
            }
            break;
        }
        case "START_FETCH_FILM_REQUEST": {
            getFilmDetails(store, action.state.selectedFilmId);
            break;
        }
        case "START_SEARCH_REQUEST": {
            var searchText = action.state.searchText;
            var sortBy = normailzeSortBy(store.getState().get("sortBy"));
            getList(store, searchText, sortBy);
            break;
        }
        case "START_SORT_REQUEST": {
            var searchText;
            var sortBy = normailzeSortBy(action.state.sortBy);
            var film = store.getState().get("selectedFilm");
            var directorId;
            if (film) {
                directorId = film.get("directorId");
            } else {
                searchText = store.getState().get("searchText");
            }
            getList(store, searchText, sortBy, directorId);
            break;
        }
        case "RECEIVE_FILM_DETAILS": {
            var sortBy = normailzeSortBy(store.getState().get("sortBy"));
            var directorId = action.state.selectedFilm.directorId;
            getList(store, "", sortBy, directorId);
            break;
        }
        case "CLEAR_FILM_DETAILS": {
            var searchText = store.getState().get("searchText");
            var sortBy = normailzeSortBy(store.getState().get("sortBy"));
            getList(store, searchText, sortBy);
            break;
        }

    }
    return next(action);
}