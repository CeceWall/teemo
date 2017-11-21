import { createAction } from 'redux-actions';
import axios from 'axios';

export const searchCities = createAction('SEARCH_CITIES', cities => cities);
export const getCityName = createAction('GET_CITY_NAME', cityInfo => cityInfo);

export function searchCitiesAsync(keyword) {
  return async (dispatch) => {
    const response = await axios.get('/api/cities/find', {
      params: {
        keyword,
      },
    });
    dispatch(searchCities(response.data));
  };
}
export function getCityNameAsync() {
  return (dispatch) => {
    if (!navigator.geolocation) {
      dispatch(getCityName({
        success: false,
        message: '您的浏览器不支持定位，请手动选择',
      }));
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const location = `${position.coords.latitude},${position.coords.longitude}`;
      const response = await axios.get('/api/cities/getCityName', {
        params: {
          location,
        },
      });
      dispatch(getCityName({
        success: true,
        result: response.data,
      }));
    }, (err) => {
      dispatch(getCityName({
        success: false,
        message: err.message || '位置信息不可用，请手动选择',
      }));
    });
  };
}

