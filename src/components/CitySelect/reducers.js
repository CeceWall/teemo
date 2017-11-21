import { handleActions } from 'redux-actions';
import { getCityName, searchCities } from './actions';

const defaultState = {
  cities: [],
  cityInfo: { loading: true },
};

export default handleActions({
  [searchCities](state, { payload: cities }) {
    return { ...state, cities };
  },
  [getCityName]: (state, { payload: cityInfo }) => ({ ...state, cityInfo }),
}, defaultState);

