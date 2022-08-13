import moment from "moment";
import {all, fork, takeLatest, put} from "redux-saga/effects";
import { ADD_TODO_POST_FAILURE, ADD_TODO_POST_REQUEST, ADD_TODO_POST_SUCCESS, LOAD_TODO_POSTS_FAILURE, LOAD_TODO_POSTS_REQUEST, LOAD_TODO_POSTS_SUCCESS } from "../reducers/todo";


function* watchLoadTodoPosts(){
    yield takeLatest(LOAD_TODO_POSTS_REQUEST, loadTodoPosts)
}

function* loadTodoPosts(){
    try{
        const localData = localStorage.getItem("Todo");
        if(localData){
            const jsonLocalData = JSON.parse(localData);
            const filteredData = jsonLocalData.filter((it) => parseInt(moment().format('YYYYMMDD')) <= parseInt(moment(it.todoDate).format('YYYYMMDD')))
            localStorage.setItem("Todo", JSON.stringify(filteredData));
            yield put({
                type: LOAD_TODO_POSTS_SUCCESS,
                data: filteredData,
            });
        }else{
            yield put({
                type: LOAD_TODO_POSTS_SUCCESS,
                data: []
            })
        }
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_TODO_POSTS_FAILURE,
            error: err.message
        })
    }
}

function* watchAddTodoPost(){
    yield takeLatest(ADD_TODO_POST_REQUEST, addTodoPost);
}

function* addTodoPost(action){
    try{
        const localData = localStorage.getItem("Todo");
        const jsonLocalData = JSON.parse(localData);
        if(jsonLocalData&&jsonLocalData.length > 0){
            const todoId = jsonLocalData[jsonLocalData.length - 1].id + 1;
            const postData = {id: todoId, ...action.data}
            const totalData = [...jsonLocalData, postData];
            localStorage.setItem("Todo", JSON.stringify(totalData));
        }else{
            const postData = {id: 1, ...action.data};
            localStorage.setItem("Todo", JSON.stringify([postData]))
        }
        yield put({
            type: ADD_TODO_POST_SUCCESS,
        })
    }catch(err){
        console.error(err);
        yield put({
            type: ADD_TODO_POST_FAILURE,
            error: err.message
        })
    }
}

export default function* todoSaga(){
    yield all([
        fork(watchLoadTodoPosts),
        fork(watchAddTodoPost),
    ])
}