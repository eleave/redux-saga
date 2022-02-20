import { take, put, call, takeEvery, takeLatest, takeLeading, select } from "@redux-saga/core/effects";
import { INCREASE_COUNT, DECREASE_COUNT, GET_LATEST_NEWS } from "../constants";
import { getLatestNews } from "../../api";
import { setLatestNews } from "../actions/actionCreator";

export function* handleLatestNews() {
  const { hits } = yield call(getLatestNews, 'react');
  yield put(setLatestNews(hits));
}

export function* watchClickSaga() {
  // yield take(INCREASE_COUNT);
  yield takeEvery(GET_LATEST_NEWS, handleLatestNews);
  // yield takeLatest(INCREASE_COUNT, workerSaga);
  // yield takeLeading(INCREASE_COUNT, workerSaga);
  
}

export default function* rootSaga() {
  yield watchClickSaga();
}