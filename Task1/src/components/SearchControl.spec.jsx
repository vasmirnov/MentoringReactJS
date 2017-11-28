import React from 'react';
import renderer from 'react-test-renderer';
import { SearchControl, SEARCH_BY } from './SearchControl';
import { Map } from 'immutable';

jest.disableAutomock();
jest.mock('./OptionText', () => { return { OptionText: 'OptionText' } });
jest.mock('./searchcontrol.css', () => {
    return {
        main: 'main',
        hTitle: 'hTitle',
        h1: 'h1',
        h2: 'h2',
        searchText: 'searchText',
        searchBy: 'searchBy',
        searchButton: 'searchButton',
        option: 'option',
        selected: 'selected'
    }
});

let props;

describe('SearchControl', () => {
    beforeEach(() => {
        props = {
            searchText: 'Test text',
            searchBy: SEARCH_BY,
            searchHandler: () => { },
            searchByHandler: () => { }
        }
    });

    test('render correctly', () => {
        const instance = renderer.create(
            <SearchControl {...props} />
        );
        expect(instance.toJSON()).toMatchSnapshot();
    });
});