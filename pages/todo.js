import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLayout from '../components/HeaderLayout';
import { LOAD_TODO_POSTS_REQUEST } from '../reducers/todo';


const TodoList = () => {
    const dispatch = useDispatch();
    const {todoPosts} = useSelector((state) => state.todo);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_POSTS_REQUEST
        })    
    }, []);

    useEffect(() => {
        if(todoPosts.length > 0){
            const copyPosts = [...todoPosts];
            
            setSortedPosts(copyPosts.sort((a, b) => parseInt(a.todoDate.split('-').join('')) - parseInt(b.todoDate.split('-').join(''))));
        }
    }, [todoPosts]);

    useEffect(() => {
        console.log(sortedPosts)
    }, [sortedPosts])

    return (
        <>
        <HeaderLayout
        extra={[<Button key="write" type='primary'>추가하기</Button>]}
        title={"Todo"}
        />
        </>
    );
};

export default TodoList;
