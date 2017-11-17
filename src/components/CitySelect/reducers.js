import { combineActions, handleActions } from 'redux-actions';
import { getCurrentPosition, searchCity } from './actions';

const defaultState = {
  cities: [],
  positionStatus: {},
};

export default handleActions({
  [combineActions(searchCity)](state, { payload: cities }) {
    return { ...state, cities };
  },

  [getCurrentPosition]: (state, { payload: positionStatus }) => ({ ...state, positionStatus }),

}, defaultState);

