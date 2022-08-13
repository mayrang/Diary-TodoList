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
    removeDiaryPostLoading: false,
    removeDiaryPostDone: false,
    removeDiaryPostError: null,

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
export const REMOVE_DIARY_POST_REQUEST = "REMOVE_DIARY_POST_REQUEST";
export const REMOVE_DIARY_POST_SUCCESS = "REMOVE_DIARY_POST_SUCCESS";
export const REMOVE_DIARY_POST_FAILURE = "REMOVE_DIARY_POST_FAILURE";




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
                draft.addDiaryPostDone = false;
                draft.removeDiaryPostDone = false;
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
            case REMOVE_DIARY_POST_REQUEST:
                draft.removeDiaryPostLoading = true;
                draft.removeDiaryPostDone = false;
                draft.removeDiaryPostError = null;
                break;
            case REMOVE_DIARY_POST_SUCCESS:
                draft.removeDiaryPostLoading = false;
                draft.removeDiaryPostDone = true;
                break;
            case REMOVE_DIARY_POST_FAILURE:
                draft.removeDiaryPostLoading = false;
                draft.removeDiaryPostError = action.error;
                break;
            default:
                break;
        }
    }));
}

export default reducer;