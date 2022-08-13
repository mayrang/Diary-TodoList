import produce from "immer";

const initialState = {
    todoPosts : [],
    loadTodoPostsLoading: false,
    loadTodoPostsDone: false,
    loadTodoPostsError: null,

}

export const dummyTodoList = [
    {
        id: 1,
        todoDate: "2022-08-15",
        todoContent: "광복절 todo"
    },
    {
        id: 2,
        todoDate: "2022-08-17",
        todoContent: "08월 17일 todo"
    },
    {
        id: 3,
        todoDate: "2022-08-20",
        todoContent: "08월 20일 todo"
    },
    {
        id: 4,
        todoDate: "2022-08-25",
        todoContent: "08월 25일 todo"
    },
    {
        id: 5,
        todoDate: "2022-08-25",
        todoContent: "08월 25일 todo2"
    },
    {
        id: 6,
        todoDate: "2022-09-13",
        todoContent: "09월 13일 todo"
    }
]

export const LOAD_TODO_POSTS_REQUEST = "LOAD_TODO_POSTS_REQUEST";
export const LOAD_TODO_POSTS_SUCCESS = "LOAD_TODO_POSTS_SUCCESS";
export const LOAD_TODO_POSTS_FAILURE = "LOAD_TODO_POSTS_FAILURE";

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
                break;
            case LOAD_TODO_POSTS_FAILURE:
                draft.loadTodoPostsError = action.error;
                draft.loadTodoPostsLoading = false;
                break;
            default:
                break;
        }
    }));
};

export default reducer;