import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

import {
  cardsLoad,
} from '../../store/cards';


const loader =
  <div className="cards-list__loader" key={ 0 }>
    <div className="loader__circle" />
  </div>
;

const _CardsList = ({ cards, cardsLoad, error, hasMoreItems }) => {
  const handleLoadItems = (page) => cardsLoad(page);

  return (
    <div className="cards-list">
      <div className="cards-list__title">
        <span className="title__poke">poke</span>
        <span className="title__cards">cards</span>
      </div>
      {
        error && (
          <div className="cards-list-error">
            <i className="cards-list-error__icon fas fa-exclamation-circle" />
            Can not load the list of cards
          </div>
        )
      }
      {
        !error && (
          <InfiniteScroll
            pageStart={ 0 }
            loadMore={ handleLoadItems }
            hasMore={ hasMoreItems }
            loader={ loader }
          >
            <div className="cards-list__elements">
              {
                cards.map((card) => (
                  <Link key={ card.id } className="cards-list__element" to={ `/details/${ card.id }` }>
                    <span><img className="element__img" src={ card.imageUrl } /></span>
                    <div>
                      <div className="element__name">{ card.name }</div>
                      <div className="element__tagline">{ card.supertype }</div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </InfiniteScroll>
        )
      }
    </div>
  );
};

_CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  cardsLoad: PropTypes.func.isRequired,
  error: PropTypes.any,
  hasMoreItems: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.cards.collection,
  hasMoreItems: state.cards.hasMoreItems,
  error: state.cards.error,
});

const mapDispatchToProps = (dispatch) => ({
  cardsLoad: (page) => dispatch(cardsLoad(page)),
});

const CardsList = connect(mapStateToProps, mapDispatchToProps)(_CardsList);

export { CardsList };
