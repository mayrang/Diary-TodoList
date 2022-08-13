import { Button, Card, Collapse } from 'antd';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLayout from '../../components/HeaderLayout';
import { LOAD_TODO_POSTS_REQUEST, REMOVE_TODO_POST_REQUEST } from '../../reducers/todo';


const TodoList = () => {
    const dispatch = useDispatch();
    const {todoPosts, removeTodoPostDone} = useSelector((state) => state.todo);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [collapse, setCollapse] = useState([]);
    const router = useRouter()

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_POSTS_REQUEST
        })    
    }, []);

    useEffect(() => {
        if(removeTodoPostDone){
            dispatch({
                type: LOAD_TODO_POSTS_REQUEST
            });
        }
    }, [removeTodoPostDone]);

    useEffect(() => {
        if(todoPosts.length > 0){
            const copyPosts = [...todoPosts];
            copyPosts.sort((a, b) => parseInt(a.todoDate.split('-').join('')) - parseInt(b.todoDate.split('-').join('')))
            let finalPosts = [];
            for(const post of copyPosts){
                if(finalPosts.find((it) => it.todoDate === post.todoDate)){
                    finalPosts = finalPosts.map((it) => it.todoDate === post.todoDate ?
                    {...it, posts: [...it.posts, post]} : it)
                }else{
                    finalPosts.push({todoDate: post.todoDate, posts:[post]}) 
                }
            }
            setSortedPosts(finalPosts);
            setCollapse(finalPosts.map((it) => it.todoDate))
        }
    }, [todoPosts]);

    const clickWrite = useCallback(() => {
        router.push('/todo/write')
    }, []);

    const removeTodo = useCallback((id) => {
        dispatch({
            type: REMOVE_TODO_POST_REQUEST,
            id: id
        });
    }, []);

    return (
        <>
        <Head>
            <title>
                Todo
            </title>
        </Head>
        <HeaderLayout
        extra={[<Button key="write" type='primary' onClick={clickWrite}>추가하기</Button>]}
        title={"Todo"}
        />
        {sortedPosts&&<Collapse
            activeKey={collapse}
            onChange={setCollapse}
            ghost
        >
            {sortedPosts.map((it) => (
                <Collapse.Panel key={it.todoDate} header={`D-${Math.ceil(moment.duration(moment(`${it.todoDate}`).diff(moment())).asDays()) > 0 
                                                                ? Math.ceil(moment.duration(moment(`${it.todoDate}`).diff(moment())).asDays())
                                                                : "Day"}`}
                >
                    {it.posts.map((it) => (
                        <Card
                            style={{marginTop: "10px"}}
                            key={it.id}
                            title={it.todoDate}
                            extra={[<Button key="remove" onClick={() => removeTodo(it.id)} type="primary">완료</Button>]}
                        >
                            {it.todoContent}
                        </Card>
                    ))}
                </Collapse.Panel>
            ))}
        </Collapse>}
        </>
    );
};

export default TodoList;
