import { all, fork } from 'redux-saga/effects';
import diarySaga from './diary';





export default function* rootSaga() {
    yield all([
        fork(diarySaga),
    ])
}