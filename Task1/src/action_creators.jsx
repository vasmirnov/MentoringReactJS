
export function startSearchRequest(searchText) {
  return {
    type: 'START_SEARCH_REQUEST',
    state:{
      searchText
    }
  }
}
export function startSortRequest(sortBy) {
  return {
    type: 'START_SORT_REQUEST',
    state:{
      sortBy
    }
  }
}

export function receiveFilmsList(list) {
  return {
    type: 'RECEIVE_FILM_LIST',
    state: list
  }
}

export function startFetchFilmRequest(selectedFilmId) {
  return {
    type: 'START_FETCH_FILM_REQUEST',
    state:{
      selectedFilmId
    }
  }
}

export function receiveFilmDetails(selectedFilm) {
  return {
    type: 'RECEIVE_FILM_DETAILS',
    state:{
      selectedFilm 
    }
  }
}

export function clearFilmDetails() {
  return {
    type: 'CLEAR_FILM_DETAILS',
    state:{}
  }
}

