import uniqBy from 'lodash.uniqby';

import {
  CARDS_LOAD_SUCCESS,
  CARDS_LOAD_ERROR,
  CARD_LOAD_SUCCESS,
  CARDS_HAS_MORE_ITEMS,
} from './cards.constants';

const initialState = {
  collection: [],
  data: {},
  error: null,
  hasMoreItems: true,
};

const cardsReducer = (state = initialState, action = { type: '', payload: [] }) => {
  switch (action.type) {
    case CARDS_LOAD_SUCCESS: {
      const { collection } = action.payload;

      const newCollection = [
        ...state.collection,
        ...collection,
      ];

      return {
        ...state,
        collection: uniqBy(newCollection, 'id'),
      };
    }

    case CARDS_LOAD_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
      };
    }

    case CARD_LOAD_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    }

    case CARDS_HAS_MORE_ITEMS: {
      const { hasMoreItems } = action.payload;

      return {
        ...state,
        hasMoreItems,
      };
    }

    default: {
      return state;
    }
  }
};

export { cardsReducer };
