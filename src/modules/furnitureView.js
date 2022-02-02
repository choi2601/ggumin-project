import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeEvery } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as furnitureViewAPI from '../lib/api/furnitureView';

const INITIALIZE_FORM = 'FURNITUREVIEW/INITIALIZE_FORM';

const REGISTER_CURRENT_CHECKED_PRODUCT =
  'FURNITUREVIEW/REGISTER_CURRENT_CHECKED_PRODUCT';

const DELETE_CURRENT_CHECKED_PRODUCT =
  'FURNITUREVIEW/DELETE_CURRENT_CHECKED_PRODUCT';

const [
  FETCH_FURNITUREVIEW,
  FETCH_FURNITUREVIEW_SUCCESS,
  FETCH_FURNITUREVIEW_FAILURE,
] = createRequestActionTypes('FURNITUREVIEW/FETCH_FURNITUREVIEW');

export const initializeForm = createAction(INITIALIZE_FORM);

export const fetchFurnitureView = createAction(FETCH_FURNITUREVIEW);

export const registerCurrentCheckedProduct = createAction(
  REGISTER_CURRENT_CHECKED_PRODUCT,
  productId => productId
);

export const deleteCurrentCheckedProduct = createAction(
  DELETE_CURRENT_CHECKED_PRODUCT
);

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
  currentSelectedProductInfo: {},
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
    [REGISTER_CURRENT_CHECKED_PRODUCT]: (state, { payload: productId }) =>
      produce(state, draft => {
        draft.currentSelectedProductInfo = state.productList.find(
          product => product.productId === Number(productId)
        );
      }),
    [DELETE_CURRENT_CHECKED_PRODUCT]: state => ({
      ...state,
      currentSelectedProductInfo: {},
    }),
  },
  initialState
);

export default furnitureView;
