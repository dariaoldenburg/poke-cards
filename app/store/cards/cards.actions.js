import axios from 'axios';

import {
  CARDS_LOAD_ERROR,
  CARDS_LOAD_SUCCESS,
  CARDS_HAS_MORE_ITEMS,
  CARD_LOAD_ERROR,
  CARD_LOAD_SUCCESS,
} from './cards.constants';

const cardsLoadSuccess = (collection) => ({
  type: CARDS_LOAD_SUCCESS,
  payload: {
    collection,
  },
});

const cardsLoadError = (error) => ({
  type: CARDS_LOAD_ERROR,
  payload: {
    error,
  },
});

const cardsHasMoreItems = (hasMoreItems) => ({
  type: CARDS_HAS_MORE_ITEMS,
  payload: {
    hasMoreItems,
  },
});

const cardsLoad = (page) => (dispatch) => axios.get(`https://api.pokemontcg.io/v1/cards?page=${page}&pageSize=${20}&supertype=Pokémon`, { headers: { 'Access-Control-Allow-Origin': '*' } })
  .then((response) => {
    dispatch(cardsLoadSuccess(response.data.cards));
    if (response.data.length < 20) {
      dispatch(cardsHasMoreItems(false));
    }
  })
  .catch((error) => dispatch(cardsLoadError(error)));

const cardLoadSuccess = (data) => ({
  type: CARD_LOAD_SUCCESS,
  payload: {
    data,
  },
});

const cardLoadError = (error) => ({
  type: CARD_LOAD_ERROR,
  payload: {
    error,
  },
});

const cardLoad = (id) => (dispatch) => axios.get(`https://api.pokemontcg.io/v1/cards/${id}`)
  .then((response) => dispatch(cardLoadSuccess(response.data.card)))
  .catch((error) => dispatch(cardLoadError(error)));

export {
  cardsLoad,
  cardsLoadSuccess,
  cardsLoadError,
  cardLoad,
  cardLoadSuccess,
  cardLoadError,
};
