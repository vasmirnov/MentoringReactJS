import React from 'react';
import * as s from './searchpage.css';
import { SearchControl } from './SearchControl';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from './SearchResults';

export class SearchPage extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            count: 7,
            searchBy: 'title'
        };

    }

    searchByHandler(s) {
        this.setState({
            searchBy: s
        })
    }

    render() {
        return (
			<div className={s.main}>
				<SearchControl searchByHandler={this.searchByHandler.bind(this)} searchBy={this.state.searchBy}/>
				<SearchHeader count={this.state.count}/>
				<SearchResults />
			</div >
        )
    }
}

