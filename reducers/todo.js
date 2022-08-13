import produce from "immer";

const initialState = {
    todoPosts : [],
    loadTodoPostsLoading: false,
    loadTodoPostsDone: false,
    loadTodoPostsError: null,
    addTodoPostLoading: false,
    addTodoPostDone: false,
    addTodoPostError: null,
}

export const dummyTodoList = [
    {
        id: 1,
        todoDate: "2022-08-15",
        todoContent: "광복절 todo"
    },
   
    {
        id: 2,
        todoDate: "2022-08-20",
        todoContent: "08월 20일 todo"
    },
    {
        id: 3,
        todoDate: "2022-08-17",
        todoContent: "08월 17일 todo"
    },
   
    {
        id: 4,
        todoDate: "2022-08-25",
        todoContent: "08월 25일 todo2"
    },
    {
        id: 5,
        todoDate: "2022-09-13",
        todoContent: "09월 13일 todo"
    },
    {
        id: 6,
        todoDate: "2022-08-25",
        todoContent: "08월 25일 todo"
    },
    {
        id: 7,
        todoDate: "2022-08-13",
        todoContent: "Dday!!!"
    }
]

export const LOAD_TODO_POSTS_REQUEST = "LOAD_TODO_POSTS_REQUEST";
export const LOAD_TODO_POSTS_SUCCESS = "LOAD_TODO_POSTS_SUCCESS";
export const LOAD_TODO_POSTS_FAILURE = "LOAD_TODO_POSTS_FAILURE";
export const ADD_TODO_POST_REQUEST = "ADD_TODO_POST_REQUEST";
export const ADD_TODO_POST_SUCCESS = "ADD_TODO_POST_SUCCESS";
export const ADD_TODO_POST_FAILURE = "ADD_TODO_POST_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft => {
        switch(action.type){
            case LOAD_TODO_POSTS_REQUEST:
                draft.loadTodoPostsLoading = true;
                draft.loadTodoPostsDone = false;
                draft.loadTodoPostsError = null;
                break;
            case LOAD_TODO_POSTS_SUCCESS:
                draft.loadTodoPostsLoading = false;
                draft.loadTodoPostsDone = true;
                draft.addTodoPostDone = false;
                draft.todoPosts = action.data;
                break;
            case LOAD_TODO_POSTS_FAILURE:
                draft.loadTodoPostsError = action.error;
                draft.loadTodoPostsLoading = false;
                break;
            case ADD_TODO_POST_REQUEST:
                draft.addTodoPostLoading = true;
                draft.addTodoPostDone = false;
                draft.addTodoPostError = null;
                break;
            case ADD_TODO_POST_SUCCESS:
                draft.addTodoPostDone = true;
                draft.addTodoPostLoading = false;
                break;
            case ADD_TODO_POST_FAILURE:
                draft.addTodoPostLoading = false;
                draft.addTodoPostError = action.error;
                break;
            default:
                break;
        }
    }));
};

export default reducer;