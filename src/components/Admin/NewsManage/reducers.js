import { handleActions } from 'redux-actions';
import * as actions from '@/Admin/NewsManage/actions';

const defaultState = {
  newsList: {
    content: [],
    size: 10,
    number: 0,
    totalPage: 0,
    totalElements: 0,
  },
  news: {},
};

export default handleActions({
  [actions.getAllNews](state, { payload: newsList }) {
    return { ...state, newsList };
  },
  [actions.getNews](state, { payload: news }) {
    return { ...state, news };
  },
}, defaultState);
