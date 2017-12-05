import { createAction } from 'redux-actions';
import axios from 'axios';
import { fetchingFinish, fetchingStart } from 'src/utils';

export const editNews = createAction('ADMIN_EDIT_NEWS');
export const togglePublished = createAction('ADMIN_TOGGLE_PUBLISHED');
export const getAllNews = createAction('ADMIN_GET_ALL_NEWS', news => news);
export const getNews = createAction('ADMIN_GET_NEWS', newsList => newsList);

export function getAllNewsAsync(number = 0, size = 10) {
  return async (dispatch) => {
    dispatch(fetchingStart('GET_ALL_NEWS'));
    const response = await axios.get('/api/news/', {
      params: {
        number, size,
      },
    });
    dispatch(getAllNews(response.data));
    dispatch(fetchingFinish('GET_ALL_NEWS'));
  };
}

export function getNewsAsync(id) {
  return async (dispatch) => {
    dispatch(fetchingStart(getNews));
    try {
      const response = await axios.get(`/api/news/${id}`);
      dispatch(getNews(response.data));
    } finally {
      dispatch(fetchingFinish(getNews));
    }
  };
}

export function createNewsAsync(news) {
  return async (dispatch) => {
    dispatch(fetchingStart('CREATE_NEWS'));
    await axios.post('/api/news/', news);
    dispatch(fetchingFinish('CREATE_NEWS'));
  };
}

export function deleteNewsAsync(id) {
  return async () => {
    await axios.delete(`/api/news/${id}`);
  };
}

export function togglePublishedAsync(id, published) {
  return async (dispatch) => {
    dispatch(fetchingStart(togglePublished));
    try {
      await axios.put(`/api/news/${id}/${published}`);
    } finally {
      dispatch(fetchingFinish(togglePublished));
    }
  };
}

export function editNewsAsync(news) {
  return async (dispatch) => {
    dispatch(fetchingStart(editNews));
    const { id } = news;
    try {
      await axios.put(`/api/news/${id}`, news);
    } finally {
      dispatch(fetchingFinish(editNews));
    }
  };
}
