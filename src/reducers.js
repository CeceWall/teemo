import { combineReducers } from 'redux';
import HomeReducers from './components/Home/reducers';
import CitySelectReducers from './components/CitySelect/reducers';

export default combineReducers({
  HomeReducers,
  citySelect: CitySelectReducers,
});
