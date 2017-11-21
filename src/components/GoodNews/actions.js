import { createAction } from 'redux-actions';
import axios from 'axios';

export const getNews = createAction('GET_NEWS', news => news);

export function getNewsAsync(newsId) {
  return async (dispatch) => {
    const url = `/api/news/${newsId}`;
    const response = await axios.get(url);
    dispatch(getNews(response.data));
  };
}
