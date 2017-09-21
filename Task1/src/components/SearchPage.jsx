import React from 'react';
import * as s from './searchpage.css';
import { SearchControl } from './SearchControl';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from './SearchResults';
import { FullView } from './FullView';
import killBill1 from '../img/kill-bill-1.jpg';
import killBill2 from '../img/kill-bill-2.jpg';

export class SearchPage extends React.PureComponent {

    constructor(...args) {
        super(...args);

        this.state = {
            count: 7,
            searchBy: 'title',
            sortBy: 'release date',
            films: [
                {
                    id: 1,
                    img: killBill1,
                    title: "Убить билла 1",
                    year: "2001",
                    rating: 4.1,
                    genre: "Action & Adventure",
                    timing: 154,
                    description: "Вычеркнув двоих из смертельного списка, Невеста лишь наполовину приблизилась к цели. Теперь на очереди Бад и Элли Драйвер, уже приговоренные воскресшей жертвой! Еще два опасных шага перед последней схваткой, в которой она должна Убить Билла!..",
                    director: "Quentin Tarantino",
                    cast: "Ума Турман, Дэвид Кэрредин, Майкл Мэдсен, Дэрил Ханна, Цзя-Хуэй Лю, Перла Аней-Жардине, Ларри Бишоп, Майкл Паркс, Бо Свенсон, Дженни Эппер..."
                },
                {
                    id: 2,
                    img: killBill2,
                    title: "Убить билла 2",
                    year: "2005",
                    rating: 3.1,
                    genre: "Action & Adventure",
                    timing: 154,
                    description: "Вычеркнув двоих из смертельного списка, Невеста лишь наполовину приблизилась к цели. Теперь на очереди Бад и Элли Драйвер, уже приговоренные воскресшей жертвой! Еще два опасных шага перед последней схваткой, в которой она должна Убить Билла!..",
                    director: "Quentin Tarantino",
                    cast: "Ума Турман, Дэвид Кэрредин, Майкл Мэдсен, Дэрил Ханна, Цзя-Хуэй Лю, Перла Аней-Жардине, Ларри Бишоп, Майкл Паркс, Бо Свенсон, Дженни Эппер..."
                },
                {
                    id: 3,
                    img: killBill2,
                    title: "Убить билла 3",
                    year: "2008",
                    rating: 2.1,
                    genre: "Action & Adventure",
                    timing: 154,
                    description: "Вычеркнув двоих из смертельного списка, Невеста лишь наполовину приблизилась к цели. Теперь на очереди Бад и Элли Драйвер, уже приговоренные воскресшей жертвой! Еще два опасных шага перед последней схваткой, в которой она должна Убить Билла!..",
                    director: "Quentin Tarantino",
                    cast: "Ума Турман, Дэвид Кэрредин, Майкл Мэдсен, Дэрил Ханна, Цзя-Хуэй Лю, Перла Аней-Жардине, Ларри Бишоп, Майкл Паркс, Бо Свенсон, Дженни Эппер..."
                },
                {
                    id: 4,
                    img: killBill2,
                    title: "Убить билла 4",
                    year: "2012",
                    rating: 1.1,
                    genre: "Action & Adventure",
                    timing: 154,
                    description: "Вычеркнув двоих из смертельного списка, Невеста лишь наполовину приблизилась к цели. Теперь на очереди Бад и Элли Драйвер, уже приговоренные воскресшей жертвой! Еще два опасных шага перед последней схваткой, в которой она должна Убить Билла!..",
                    director: "Quentin Tarantino",
                    cast: "Ума Турман, Дэвид Кэрредин, Майкл Мэдсен, Дэрил Ханна, Цзя-Хуэй Лю, Перла Аней-Жардине, Ларри Бишоп, Майкл Паркс, Бо Свенсон, Дженни Эппер..."
                },
            ]
        };

        this.searchByHandler = this.searchByHandler.bind(this);
        this.selectFilmHandler = this.selectFilmHandler.bind(this);
        this.unselectFilmHandler = this.unselectFilmHandler.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
    }

    searchByHandler(s) {
        this.setState({
            searchBy: s,
            selectedDirector: (s == 'director') && "Quentien Tarantino"
        })
    }
    sortByHandler(s) {
        this.setState({
            sortBy: s
        })
    }
    selectFilmHandler(film) {
        this.setState({
            selectedFilm: film
        })
    }
    unselectFilmHandler() {
        this.setState({
            selectedFilm: undefined
        })
    }

    render() {
        return (
			<div className={s.main}>
				{!this.state.selectedFilm && <SearchControl searchByHandler={this.searchByHandler} searchBy={this.state.searchBy}/>}
                {this.state.selectedFilm && <FullView film={this.state.selectedFilm} unselectFilmHandler={this.unselectFilmHandler}/>}
				<SearchHeader count={this.state.count} sortBy={this.state.sortBy} director={this.state.selectedDirector} sortByHandler={this.sortByHandler}/>
				<SearchResults films={this.state.films} selectFilmHandler={this.selectFilmHandler}/>
			</div >
        )
    }
}

