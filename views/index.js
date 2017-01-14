/**
 * Created by scmhzl on 2016/12/26.
 */
import React ,{ Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory,IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import reducer from "../routes/react/reducer/index.js";

import IndexMain from './components/indexMain';//leftAuthor rightFixed rightBox
import RightArticle from './components/rightArticle';//right article
import Login from './components/login';//login
import Register from './components/register';//login
import postBox from './components/postBox';//login
import posts from './components/posts';//login

const store = createStore(reducer,applyMiddleware(thunk))
render(
    <Provider store={store}>
        <Router history = { hashHistory }>
           <Route path = "/" component={IndexMain} >
                 <IndexRoute component={RightArticle}/>
                 <Route path = "right/register" component = {Register} />
                 <Route path = "right/posts/:id" component = {posts}/>
                 <Route path = "right/login" component = {Login} />
                 <Route path = "right/comment/:id" component = {postBox} />
           </Route>
        </Router>
    </Provider>
    , document.getElementById("App")
);

