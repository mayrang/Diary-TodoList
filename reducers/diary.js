import produce from "immer";

const initialState = {
    diaryPosts: [],
    singlePost: {},

}

export const LOAD_DIARY_POSTS = "LOAD_DIARY_POSTS";
export const LOAD_DIARY_POST = "LOAD_DIARY_POST";

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
            case LOAD_DIARY_POSTS:{
                const yearMonth = `${action.year}-${parseInt(action.month) > 10 ? action.month : ("0" + action.month)}`;
                const monthPosts = dummyDiary.filter((it) => it.diaryDate.slice(0, 7) === yearMonth);
                draft.diaryPosts = monthPosts;
                break;
            }
            case LOAD_DIARY_POST:{
                const singlePost = dummyDiary.find((it) => it.id === parseInt(action.id));
                draft.singlePost = singlePost;
                break;
            }  
            default:
                break;
        }
    }));
}

export default reducer;