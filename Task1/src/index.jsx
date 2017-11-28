import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { App } from './App';
import { NotFound } from './components/NotFound';
import { SearchPageContainer, SearchPage, SORT_BY } from './components/SearchPage';
import { SEARCH_BY } from './components/SearchControl';
import  { startSearchRequest }  from  './action_creators';
import { remoteActionMiddleware } from './remote_action_middleware';
import  { api_key  } from  './api_key';

console.log(remoteActionMiddleware)
const store = createStore(reducer, applyMiddleware(remoteActionMiddleware));

ReactDom.render((
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={SearchPageContainer} />
                    <Route path="/film/:sortBy/:id" component={SearchPageContainer} />
                    <Route path="/search/:searchBy?/:sortBy?/:searchText?" component={SearchPageContainer} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </App>
        </Router>
    </Provider>
), document.getElementById('app'));