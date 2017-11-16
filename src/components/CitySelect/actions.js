import {createAction} from 'redux-actions';
import axios from 'axios';

export const searchCity = createAction("SEARCH_CITY", async (keyword) => {
    const response = await axios.get('/api/cities/find', {
        params: {
            keyword,
        }
    });
    return response.data;
});

export const getCurrentPosition = createAction("GET_CURRENT_POSITION", async () => {
    if (!navigator.geolocation) {
        return {
            success: false,
            message: '您的浏览器不支持定位',
        };
    }
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                success: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        }, (err) => {
            resolve({
                success: false,
                code: err.code,
                message: err.message
            })
        })
    });
});




