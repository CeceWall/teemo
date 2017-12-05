import { createAction, handleActions } from 'redux-actions';

export const fetchingStart = createAction('FETCHING_START', component => component.toString());
export const fetchingFinish = createAction('FETCHING_FINISH', component => component.toString());

/**
 * 用于获取是否在加载的工具方法
 * @param {object} state redux的state
 * @param {string} component 正在加载的组件名
 * @return {boolean|undefined}
 */
export function getFetchingStatus(state, component) {
  return state.commonReducers.fetchingData[component];
}

export default handleActions({
  [fetchingStart](state, action) {
    const { fetchingData } = state;
    fetchingData[action.payload] = true;
    return { ...state, fetchingData };
  },
  [fetchingFinish](state, action) {
    const { fetchingData } = state;
    fetchingData[action.payload] = false;
    return { ...state, fetchingData };
  },
}, { fetchingData: [] });
