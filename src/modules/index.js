import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import furnitureView, { furnitureViewSaga } from './furnitureView';

const rootReducer = combineReducers({
  loading,
  furnitureView,
});

export function* rootSaga() {
  yield all([furnitureViewSaga()]);
}

export default rootReducer;
