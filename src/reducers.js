import { combineReducers } from 'redux';
import HomeReducers from '@/Home/reducers';
import CitySelectReducers from '@/CitySelect/reducers';
import GoodNewsReducers from '@/GoodNews/reducers';

export default combineReducers({
  HomeReducers,
  citySelect: CitySelectReducers,
  goodNews: GoodNewsReducers,
});
