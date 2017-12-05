import { createAction } from 'redux-actions';
import axios from 'axios';

export const getNews = createAction('GET_NEWS', news => news);

export function getNewsAsync(newsId) {
  return async (dispatch) => {
    const url = `/api/news/${newsId}`;
    try {
      const response = await axios.get(url);
      dispatch(getNews(response.data));
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 404:
            window.location.replace('/not-found');
            break;
          default:
            break;
        }
      }
    }
  };
}
