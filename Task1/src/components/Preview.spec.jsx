import React from 'react';
import renderer from 'react-test-renderer';
import { Preview } from './Preview';
import { Map } from 'immutable';

jest.disableAutomock();
jest.mock('../img/default.jpg', () => 'defaultImg');

jest.mock('./preview.css', () => {
    return {
        main: 'main',
        img: 'img',
        title: 'title',
        year: 'year',
        genre: 'genre'
    }
});

let props;

describe('Preview', () => {

    test('render general', () => {
        const props = {
            selectFilmHandler: () => { },
            film: Map({
                id: 1,
                img: '1.jpg',
                title: 'Kill Bill 1',
                year: '2001',
                genre: 'comedy'
            })
        }
        const instance = renderer.create(
            <Preview {...props} />
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });

    test('render default img', () => {
        const props = {
            selectFilmHandler: () => { },
            film: Map({
                id: 1,
                title: 'Kill Bill 2',
                year: '2003',
                genre: 'comedy'
            })
        }
        const instance = renderer.create(
            <Preview {...props} />
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });
});
