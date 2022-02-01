import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeEvery } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as furnitureViewAPI from '../lib/api/furnitureView';

const INITIALIZE_FORM = 'FURNITUREVIEW/INITIALIZE_FORM';

const [
  FETCH_FURNITUREVIEW,
  FETCH_FURNITUREVIEW_SUCCESS,
  FETCH_FURNITUREVIEW_FAILURE,
] = createRequestActionTypes('FURNITUREVIEW/FETCH_FURNITUREVIEW');

export const initializeForm = createAction(INITIALIZE_FORM);

export const fetchFurnitureView = createAction(FETCH_FURNITUREVIEW);

const fetchFurnitureViewSaga = createRequestSaga(
  FETCH_FURNITUREVIEW,
  furnitureViewAPI.furnitureView
);

export function* furnitureViewSaga() {
  yield takeEvery(FETCH_FURNITUREVIEW, fetchFurnitureViewSaga);
}

const initialState = {
  roomInfo: {
    id: '',
    imageUrl: '',
  },
  productList: [],
  furnitureViewError: null,
};

const furnitureView = handleActions(
  {
    [INITIALIZE_FORM]: state => initialState,
    [FETCH_FURNITUREVIEW_SUCCESS]: (state, { payload: message }) =>
      produce(state, draft => {
        draft.roomInfo.id = message.id;
        draft.roomInfo.imageUrl = message.imageUrl;
        draft.productList = state.productList.concat(message.productList);
        draft.furnitureViewError = null;
      }),
    [FETCH_FURNITUREVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      furnitureViewError: error,
    }),
  },
  initialState
);

export default furnitureView;
