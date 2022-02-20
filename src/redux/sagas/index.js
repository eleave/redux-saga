import { takeEvery, put, call, fork, spawn} from "@redux-saga/core/effects";
import { GET_NEWS, SET_LATEST_NEWS_ERROR, SET_POPULAR_NEWS_ERROR } from "../constants";
import { getLatestNews, getPopularNews } from "../../api";
import { setLatestNews, setPopularNews } from "../actions/actionCreator";

export function* handleLatestNews() {
  try {
    const { hits } = yield call(getLatestNews, 'react');
    yield put(setLatestNews(hits));
  } catch {
    yield put({ type: SET_LATEST_NEWS_ERROR, payload: "Smth went wrong with the Latest news worker" });
  }
}

export function* handlePopularNews() {
  try {
    const { hits } = yield call(getPopularNews);
    yield put(setPopularNews(hits));
  } catch {
    yield put({ type: SET_POPULAR_NEWS_ERROR, payload: "Smth went wrong with the Popular news worker" });
  }
}

export function* handleNews() {
  // take, call - blockers
  // fork, spawn - not
  // also we can use `all` and `race` effects (relevant to Promise methods)
  yield fork(handleLatestNews);
  yield fork(handlePopularNews);
}

export function* watchClickSaga() {
  yield takeEvery(GET_NEWS, handleNews);
  
}

export default function* rootSaga() {
  yield watchClickSaga();
}