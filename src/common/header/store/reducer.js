import { actionTypes } from './';
import { fromJS } from 'immutable';

// immutable库
// immutable对象

const defaultState = fromJS({
  focused: false,
  hotList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_FOCUS:
      // immutable的set方法会结合之前immutable对象的值和设置的值, 返回一个全新的对象
      return state.set('focused', true);
    case actionTypes.SEARCH_BLUR:
      return state.set('focused', false);
    case actionTypes.CHANGE_LIST:
      return state.set('hotList', action.data);
    default:
      return state;
  }
};
