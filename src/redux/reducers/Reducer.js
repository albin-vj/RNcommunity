import types from '../types';
import {initialState} from '../InitialState';

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PROGRESS:
      return {
        ...state,
        progress: !state.progress,
      };
    case types.SET_REPOSITORY_DATA:
      return {
        ...state,
        repositoryData: action.payload,
      };
    case types.SET_REPOSITORY_DATA_COPY:
      return {
        ...state,
        repositoryDataCopy: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
