import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_FILM_DETAILS':
    case 'START_SEARCH_REQUEST':
    case 'START_SORT_REQUEST':
    case 'RECEIVE_FILM_LIST':
      return setState(state, action.state);  
    case 'CLEAR_FILM_DETAILS':
      return state.remove("selectedFilm");
  }
  return state;
}