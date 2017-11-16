import {combineActions, handleActions} from 'redux-actions'
import {getCurrentPosition, searchCity} from './actions'

const defaultState = {
    cities: [],
    positionStatus: {},
};


export default handleActions({
    [combineActions(searchCity)](state, {payload: cities}) {
        return {...state, cities: cities}
    },
    [getCurrentPosition]: (state, {payload: positionStatus}) => {
        return {...state, positionStatus: positionStatus}

    }

}, defaultState);

