import { all, fork, put, takeLatest } from "redux-saga/effects";
import { dummyDiary, LOAD_DIARY_POSTS_FAILURE, LOAD_DIARY_POSTS_REQUEST, LOAD_DIARY_POSTS_SUCCESS, LOAD_DIARY_POST_FAILURE, LOAD_DIARY_POST_REQUEST, LOAD_DIARY_POST_SUCCESS } from "../reducers/diary";


function* watchLoadDiaryPosts(){
    yield takeLatest(LOAD_DIARY_POSTS_REQUEST, loadDiaryPosts);
}

function* loadDiaryPosts(action){
    try{
        const yearMonth = `${action.year}-${parseInt(action.month) > 10 ? action.month : ("0" + action.month)}`;
        const monthPosts = dummyDiary.filter((it) => it.diaryDate.slice(0, 7) === yearMonth);
        yield put({
            type: LOAD_DIARY_POSTS_SUCCESS,
            data: monthPosts
        });
    }catch(err){
        console.log(err)
        yield put({
            type: LOAD_DIARY_POSTS_FAILURE,
            error: err.message
        });
    }
}

function* watchLoadDiaryPost(){
    yield takeLatest(LOAD_DIARY_POST_REQUEST, loadDiaryPost);
}

function* loadDiaryPost(action){
    try{
        const singlePost = dummyDiary.find((it) => it.id === parseInt(action.id));
        if(!singlePost){
            throw new Error('해당 게시물이 존재하지 않습니다.')
        }else{
            yield put({
                type: LOAD_DIARY_POST_SUCCESS,
                data: singlePost 
            })
        }
        
    }catch(err){
        console.error(err);
        yield put({
            
            type: LOAD_DIARY_POST_FAILURE,
            error: err.message
        })
    }
}

export default function* diarySaga(){
    yield all([
        fork(watchLoadDiaryPosts),
        fork(watchLoadDiaryPost)
    ])
}