import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/styles.scss';
import { store, history } from './store';

import { CardDetails } from './components/card.details';
import { CardsList } from './components/cards.list';


ReactDOM.render(
  <div className="app">
    <Provider store={ store }>
      <Router history={ history }>
        <div className="app__container">
          <Route path="/" component={ CardsList } />
          <Route exact path="/details/:id" component={ CardDetails } />
        </div>
      </Router>
    </Provider>
  </div>,
  document.getElementById('poke-cards-root')
);
