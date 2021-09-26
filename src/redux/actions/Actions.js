import types from '../types';
/**
 *(show hide progress)
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
const showHideProgress = (payload = false) => {
  return {
    type: types.TOGGLE_PROGRESS,
    payload: payload,
  };
};
/**
 *(SET REPOSITORY DATA)
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
const SetRepositoryData = (payload = []) => {
  return {
    type: types.SET_REPOSITORY_DATA,
    payload: payload,
  };
};
/**
 *(SET REPOSITORY DATA COPY)
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
const SetRepositoryDataCopy = (payload = []) => {
  return {
    type: types.SET_REPOSITORY_DATA_COPY,
    payload: payload,
  };
};

const Actions = {
  showHideProgress,
  SetRepositoryData,
  SetRepositoryDataCopy
};
export default Actions;
