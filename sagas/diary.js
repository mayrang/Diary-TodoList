import { all, fork, put, takeLatest } from "redux-saga/effects";
import { ADD_DIARY_POST_FAILURE, ADD_DIARY_POST_REQUEST, ADD_DIARY_POST_SUCCESS, LOAD_DIARY_POSTS_FAILURE, LOAD_DIARY_POSTS_REQUEST, LOAD_DIARY_POSTS_SUCCESS, LOAD_DIARY_POST_FAILURE, LOAD_DIARY_POST_REQUEST, LOAD_DIARY_POST_SUCCESS } from "../reducers/diary";


function* watchLoadDiaryPosts(){
    yield takeLatest(LOAD_DIARY_POSTS_REQUEST, loadDiaryPosts);
}

function* loadDiaryPosts(action){
    try{
        const localData = localStorage.getItem("Diary");
        if(localData){
            const jsonLocalData = JSON.parse(localData)
            const yearMonth = `${action.year}-${parseInt(action.month) > 10 ? action.month : ("0" + action.month)}`;
            const monthPosts = jsonLocalData.filter((it) => it.diaryDate.slice(0, 7) === yearMonth);
            yield put({
                type: LOAD_DIARY_POSTS_SUCCESS,
                data: monthPosts
            });
        }else{
            yield put({
                type: LOAD_DIARY_POSTS_SUCCESS,
                data: [],
            })
        }
       
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
            const localData = localStorage.getItem("Diary");
            if(localData){
                const jsonLocalData = JSON.parse(localData);
                const singlePost = jsonLocalData.find((it) => it.id === parseInt(action.id));
                if(!singlePost){
                    throw new Error('해당 게시물이 존재하지 않습니다.')
                }else{
                    yield put({
                        type: LOAD_DIARY_POST_SUCCESS,
                        data: singlePost 
                    })
                }
            }else{
                throw new Error('해당 게시물이 존재하지 않습니다.')
            }
        
       
        
    }catch(err){
        console.error(err);
        yield put({
            
            type: LOAD_DIARY_POST_FAILURE,
            error: err.message
        })
    }
}

function* watchAddDiaryPost(){
    yield takeLatest(ADD_DIARY_POST_REQUEST, addDiaryPost);
}

function* addDiaryPost(action){
    try{
        console.log(action.data)
        const localData = localStorage.getItem("Diary");
        if(localData){
            const jsonLocalData = JSON.parse(localData);
            const diaryId = jsonLocalData[jsonLocalData.length - 1].id + 1;
            const postData = {id: diaryId, ...action.data}
            const totalData = [...jsonLocalData, postData];
            localStorage.setItem("Diary", JSON.stringify(totalData));
        }else{
            const postData = {id: 1, ...action.data};
            localStorage.setItem("Diary", JSON.stringify([postData]))
        }
        

        yield put({
            type: ADD_DIARY_POST_SUCCESS,
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_DIARY_POST_FAILURE,
            error: err.message
        })
    }
}

export default function* diarySaga(){
    yield all([
        fork(watchLoadDiaryPosts),
        fork(watchLoadDiaryPost),
        fork(watchAddDiaryPost),
    ])
}