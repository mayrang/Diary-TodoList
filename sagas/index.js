import { all, fork } from 'redux-saga/effects';
import diarySaga from './diary';
import todoSaga from './todo';




export default function* rootSaga() {
    yield all([
        fork(diarySaga),
        fork(todoSaga),
    ])
}