import {all, fork, takeLatest, put} from "redux-saga/effects";
import { dummyTodoList, LOAD_TODO_POSTS_FAILURE, LOAD_TODO_POSTS_REQUEST, LOAD_TODO_POSTS_SUCCESS } from "../reducers/todo";


function* watchLoadTodoPosts(){
    yield takeLatest(LOAD_TODO_POSTS_REQUEST, loadTodoPosts)
}

function* loadTodoPosts(){
    try{
        yield put({
            type: LOAD_TODO_POSTS_SUCCESS,
            data: dummyTodoList
        })
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_TODO_POSTS_FAILURE,
            error: err.message
        })
    }
}

export default function* todoSaga(){
    yield all([
        fork(watchLoadTodoPosts)
    ])
}