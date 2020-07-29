import { actionTypes } from './';
import axios from 'axios';
import { BASE_URL } from '../../../api/config';
import { fromJS } from 'immutable';

const changeList = (data) => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data),
});

export const searchFocus = () => ({
  type: actionTypes.SEARCH_FOCUS,
});

export const searchBlur = () => ({
  type: actionTypes.SEARCH_BLUR,
});

export const getHotList = () => {
  return async (dispatch) => {
    try {
      const {
        data: { list },
      } = await axios.get(`${BASE_URL}/getHotList`);
      console.log('data:', list);
      dispatch(changeList(list));
    } catch (e) {
      throw new Error(e);
    }
  };
};
