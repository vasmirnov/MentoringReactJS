import * as React from 'react';
import * as ReactDom from 'react-dom/server';
import { StaticRouter as Router1, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { App } from './App';
import { NotFound } from './components/NotFound';
import { SearchPageContainer, SearchPage, SORT_BY } from './components/SearchPage';
import { SEARCH_BY } from './components/SearchControl';
import { startSearchRequest } from './action_creators';
import { remoteActionMiddleware } from './remote_action_middleware';
import { api_key } from './api_key';

const store = createStore(reducer, applyMiddleware(remoteActionMiddleware));

const html = (store, staticContext) => ReactDom.renderToString(
    <Provider store={store}>
        <Router1 context={staticContext}>
            <App>
                <Switch>
                    <Route exact path="/" component={SearchPageContainer} />
                    <Route path="/film/:sortBy/:id" component={SearchPageContainer} />
                    <Route path="/search/:searchBy?/:sortBy?/:searchText?" component={SearchPageContainer} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </App>
        </Router1>
    </Provider>
);

function renderFullPage(html, state) {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
    </head>
    
    <body>1
        <div id="app" >${html}</div>
        <script>
            window.PRELOADED_STATE = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        
    </body>
    
    </html>`
}


function handleRender(req, res) {
    const context = {};
    const htmlString = html(store, context)
    console.log('context', context);
    const location = context.location && context.location.pathname;
    if (context.url && (context.url != location)) {
        return res.redirect(context.url);
    } else {
        return res.send(renderFullPage(htmlString, store.getState()));
    }
}

export default handleRender;