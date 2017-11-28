import React from 'react';
import renderer from 'react-test-renderer';
import { SearchPage } from './SearchPage';
import { SEARCH_BY } from './SearchControl';
import { Map } from 'immutable';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

jest.disableAutomock();
jest.mock('./SearchControl', () => { return { SearchControl: 'SearchControl', SEARCH_BY: 'title' } });
jest.mock('./SearchHeader', () => { return { SearchHeader: 'SearchHeader' } });
jest.mock('./SearchResults', () => { return { SearchResults: 'SearchResults' } });
jest.mock('./FullView', () => { return { FullView: 'FullView' } });

jest.mock('./searchpage.css', () => {
    return {
        main: 'main',
        img: 'img',
        title: 'title',
        year: 'year',
        genre: 'genre'
    }
});

let props;

describe('SearchPage', () => {

    test('render general', () => {
        const props = {
            match: {},
            init: () => { },
            // SearchControl
            searchText: 'Test text',
            searchBy: SEARCH_BY,
            startSearchRequest: () => { },
            //SearchHeader
            count: 100500,
            sortBy: 'author',
            startSortRequest: () => { },
            selectedFilm: Map({
                id: 1,
                img: '1.jpg',
                title: 'Kill Bill 1',
                year: '2001',
                genre: 'comedy'
            }),
            //SearchResults
            films: [Map({ id: 1 }), Map({ id: 2 })],
            startFetchFilmRequest: () => { }
        }
        const instance = renderer.create(
            <Router>
                <SearchPage {...props} />
            </Router>
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });

});
