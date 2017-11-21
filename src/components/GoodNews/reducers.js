import { handleActions } from 'redux-actions';
import { getNews } from './actions';

const defaultState = {
  news: {},
};
export default handleActions({
  [getNews](state, { payload: news }) {
    return { ...state, news };
  },
}, defaultState);
