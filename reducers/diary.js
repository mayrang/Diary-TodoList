import produce from "immer";

const initialState = {
    diaryPosts: [],
    singlePost: {},
    loadDiaryPostsLoading: false,
    loadDiaryPostsDone: false,
    loadDiaryPostsError: null,
    loadDiaryPostLoading: false,
    loadDiaryPostDone: false,
    loadDiaryPostError: null,
    addDiaryPostLoading: false,
    addDiaryPostDone: false,
    addDiaryPostError: null,

}

export const LOAD_DIARY_POSTS_REQUEST = "LOAD_DIARY_POSTS_REQUEST";
export const LOAD_DIARY_POSTS_SUCCESS = "LOAD_DIARY_POSTS_SUCCESS";
export const LOAD_DIARY_POSTS_FAILURE = "LOAD_DIARY_POSTS_FAILURE";
export const LOAD_DIARY_POST_REQUEST = "LOAD_DIARY_POST_REQUEST";
export const LOAD_DIARY_POST_SUCCESS = "LOAD_DIARY_POST_SUCCESS";
export const LOAD_DIARY_POST_FAILURE = "LOAD_DIARY_POST_FAILURE";
export const ADD_DIARY_POST_REQUEST = "ADD_DIARY_POST_REQUEST";
export const ADD_DIARY_POST_SUCCESS = "ADD_DIARY_POST_SUCCESS";
export const ADD_DIARY_POST_FAILURE = "ADD_DIARY_POST_FAILURE";

export const dummyDiary = [
    {
        id: 1,
        diaryDate: "2022-08-02",
        diaryContent: "안녕하세요 08월 02일 일기의 더미 데이터입니다^_^",
        diaryRate: 4.0,
        diaryTags: [{whether: 'Sunny', color: 'red'}, {whether: 'Hot', color: 'volcano'}],
    },
    {
        id: 2,
        diaryDate: "2022-08-04",
        diaryContent: "안녕하세요 08월 04일 일기의 더미 데이터입니다..",
        diaryRate: 2.5,
        diaryTags: [{whether: 'Clody', color: 'cyan'}, {whether: 'Cool', color: 'green'}],
    },
    {
        id: 3, 
        diaryDate: "2022-08-07",
        diaryContent: "안녕하세요 08월 07일 일기의 더미 데이터입니다.",
        diaryRate: 3.5,
        diaryTags: [{whether: 'Rainy', color: 'purple'}, {whether: 'Hot', color: 'volcano'}],
    },
    {
        id: 4,
        diaryDate: "2022-08-09",
        diaryContent: "안녕하세요 08월 09일 일기의 더미 데이터입니다. 08월의 눈이라니 지구멸망이다!!!",
        diaryRate: 5.0,
        diaryTags: [{whether: 'Snow', color: 'geekblue'}, {whether: 'Cold', color: 'blue'}],
    },
    {
        id: 5,
        diaryDate: "2022-08-10",
        diaryContent: "안녕하세요 08월 10일 일기의 더미 데이터입니다. 안녕하세요 08월 10일 일기의 더미 데이터입니다.안녕하세요 08월 10일 일기의 더미 데이터입니다.안녕하세요 08월 10일 일기의 더미 데이터입니다.",
        diaryRate: 1.5,
        diaryTags: [{whether: 'Sunny', color: 'red'}, {whether: 'Cool', color: 'green'}],
    },
    {
        id: 6, 
        diaryDate: "2022-07-03",
        diaryCotent: "안녕하세요 07월 03일 일기의 더미 데이터입니다.",
        diaryRate: 3.5,
        diaryTags: [{whether: 'Sunny', color: 'red'}, {whether: 'Cold', color: 'blue'}],
    },
    {
        id: 7, 
        diaryDate: "2022-07-11",
        diaryContent: "안녕하세요 07월 11일 일기의 더미 데이터입니다.",
        diaryRate: 2.0,
        diaryTags: [{whether: 'Rainy', color: 'purple'}, {whether: 'Cold', color: 'blue'}],
    },
    {
        id: 8,
        diaryDate: "2022-07-22",
        diaryContent: "안녕하세요 07월 22일 일기의 더미 데이터입니다.",
        diaryRate: 5.0,
        diaryTags: [{whether: 'Sunny', color: 'red'}, {whether: 'Cool', color: 'green'}],
    },
    {
        id: 9,
        diaryDate: "2022-06-23",
        diaryContent: "안녕하세요 06월 23일 일기의 더미 데이터입니다.",
        diaryRate: 3.0,
        diaryTags: [{whether: 'Snow', color: 'geekblue'}, {whether: 'Cold', color: 'blue'}],
    },
    {
        id: 10,
        diaryDate: "2022-06-26",
        diaryContent: "오늘은 내 생일이에용",
        diaryRate: 5.0,
        diaryTags: [{whether: 'Sunny', color: 'red'}, {whether: 'Hot', color: 'volcano'}],
    },

]


const reducer = (state=initialState, action) => {
    return produce(state, (draft => {
        switch(action.type){
            case LOAD_DIARY_POSTS_REQUEST:
                draft.loadDiaryPostsLoading = true;
                draft.loadDiaryPostsDone = false;
                draft.loadDiaryPostsError = null;
                break;
            case LOAD_DIARY_POSTS_SUCCESS:
                draft.loadDiaryPostsLoading = false;
                draft.loadDiaryPostsDone = true;
                draft.diaryPosts = action.data;
                break;
            case LOAD_DIARY_POSTS_FAILURE:
                draft.loadDiaryPostsLoading = false;
                draft.loadDiaryPostsError = action.error;
                break;
            case LOAD_DIARY_POST_REQUEST:
                
                draft.loadDiaryPostLoading = true;
                draft.loadDiaryPostDone = false;
                draft.loadDiaryPostError = null;
                break;
            case LOAD_DIARY_POST_SUCCESS:
                draft.loadDiaryPostLoading = false;
                draft.loadDiaryPostDone = true;
                draft.singlePost = action.data;
                break;
            case LOAD_DIARY_POST_FAILURE:
                draft.loadDiaryPostLoading = false;
                draft.loadDiaryPostError = action.error;
                break;
            case ADD_DIARY_POST_REQUEST:
                draft.addDiaryPostLoading = true;
                draft.addDiaryPostDone = false;
                draft.addDiaryPostError = null;
                break;
            case ADD_DIARY_POST_SUCCESS:
                draft.addDiaryPostLoading = false;
                draft.addDiaryPostDone = true;
                break;
            case ADD_DIARY_POST_FAILURE:
                draft.addDiaryPostLoading = false;
                draft.addDiaryPostError = action.error;
                break;
            default:
                break;
        }
    }));
}

export default reducer;