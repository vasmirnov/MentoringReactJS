import React from 'react';
import renderer from 'react-test-renderer';
import { SearchResults } from './SearchResults';
import { Map } from 'immutable';

jest.disableAutomock();
jest.mock('./Preview', () => { return { Preview: 'Preview' } });

let props;

describe('SearchResults', () => {
    beforeEach(() => {
        props = {
            selectFilmHandler: () => { },
            films: [Map({ id: 1 }), Map({ id: 2 })]
        }
    });

    test('render correctly', () => {
        const instance = renderer.create(
            <SearchResults {...props} />
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });
});