import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './components/NotFound';
import { SearchPage } from './components/SearchPage';
import { Welcome } from './components/Welcome';

ReactDom.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/film/:id" component={SearchPage} />
                <Route path="/search/:searchBy/:searchText/:sortBy" component={SearchPage} />               
                <Route path="*" component={NotFound} />

            </Switch>
        </App>
    </Router>
), document.getElementById('app'));