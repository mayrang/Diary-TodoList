import { Button, Card, Col, Collapse } from 'antd';
import moment from 'moment';
import Head from 'next/head';
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
        }
    }, [todoPosts]);

    useEffect(() => {
        console.log(sortedPosts)
    }, [sortedPosts])

    return (
        <>
        <Head>
            <title>
                Todo
            </title>
        </Head>
        <HeaderLayout
        extra={[<Button key="write" type='primary'>추가하기</Button>]}
        title={"Todo"}
        />
        <Collapse
            ghost
        >
            {sortedPosts.map((it) => (
                <Collapse.Panel key={it.todoDate} header={`D-${Math.ceil(moment.duration(moment(`${it.todoDate}`).diff(moment())).asDays()) > 0 
                                                                ? Math.ceil(moment.duration(moment(`${it.todoDate}`).diff(moment())).asDays())
                                                                : "Day"}`}
                >
                    {it.posts.map((it) => (
                        <Card
                            key={it.id}
                            title={it.todoDate}
                        >
                            {it.todoContent}
                        </Card>
                    ))}
                </Collapse.Panel>
            ))}
        </Collapse>
        </>
    );
};

export default TodoList;
