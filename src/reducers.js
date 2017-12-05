import { combineReducers } from 'redux';
import HomeReducers from '@/Home/reducers';
import CitySelectReducers from '@/CitySelect/reducers';
import NewsManageReducers from '@/Admin/NewsManage/reducers';
import GoodNewsReducers from '@/GoodNews/reducers';
import commonReducers from './utils';


export default combineReducers({
  commonReducers,
  HomeReducers,
  citySelect: CitySelectReducers,
  goodNews: GoodNewsReducers,
  newsManage: NewsManageReducers,
});
