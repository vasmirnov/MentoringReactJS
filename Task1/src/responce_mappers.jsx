import { api_key } from './api_key';

export function setList(state, genres) {
    var films = state.results.map(v => convertListItem(v, genres));
    return {
        count : state.total_results,
        pages : state.total_pages,
        page : state.page,
        films
    }
  }
  
function convertListItem(v, genres){
  var genre_id = ""+v.genre_ids[0]
  return {
    id: v.id,
    img: v.poster_path,
    title: v.title,
    year: v.release_date.substring(0,4),
    rating: v.vote_average / 2,
    genre: genres.get && genres.get(genre_id) || genres[genre_id],
    timing: v.runtime,
    description: v.overview
  }
}
export function setGenres(json) {
    var genres = {};
    json.genres.forEach((it) => {genres[it.id] = it.name});
    return genres;
}

export function setCredits(json, selectedFilm) {
    selectedFilm.cast = json.cast.map(it => it.character).join(", ");
    var director = json.crew.find(e => e.job == "Director");
    selectedFilm.director = director && director.name;
    selectedFilm.directorId = director && director.id;
    return selectedFilm;
}


export function setDetails(json) {
    var selectedFilm = convertDetailsItem(json);
    return selectedFilm;
  }

function convertDetailsItem(v){
    return {
      id: v.id,
      img: v.poster_path,
      title: v.title,
      year: v.release_date && v.release_date.substring(0,4),
      rating: v.vote_average / 2,
      genre: v.genres && v.genres[0].name,
      timing: v.runtime,
      description: v.overview,
      director: "1",
      cast: "2"
    }
  }