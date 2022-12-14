import React, { useCallback, useEffect, useState } from 'react';
import HeaderLayout from "../components/HeaderLayout"
import {Button, Select} from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import DiaryCard from '../components/DiaryCard';
import {LOAD_DIARY_POSTS_REQUEST } from '../reducers/diary';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';



const Home = () => {
    const [month, setMonth] = useState(parseInt(moment().format('MM')));
    const [year, setYear] = useState(parseInt(moment().format('YYYY')));
    const [sorted, setSorted] = useState("latest");
    const [sortedPosts, setSortedPosts] = useState([]);
    const dispatch = useDispatch();
    const {diaryPosts} = useSelector((state) => state.diary);
    const router = useRouter()

    useEffect(() => {
        const copyPosts = [...diaryPosts]
        console.log(sorted)
        if(sorted === 'latest'){
            setSortedPosts(copyPosts.sort((a, b) => parseInt(b.diaryDate.split('-').join('')) - parseInt(a.diaryDate.split('-').join(''))));
        }else{
            setSortedPosts(copyPosts.sort((a, b) => parseInt(a.diaryDate.split('-').join('')) - parseInt(b.diaryDate.split('-').join(''))));
        }
    }, [sorted, diaryPosts])

    useEffect(() => {
        dispatch({
            type: LOAD_DIARY_POSTS_REQUEST,
            year: year,
            month: month
        })
    }, [month, year])

    const clickPrev = useCallback(() => {
        if(month === 1){
            setYear((prev) => prev - 1);
            setMonth(12);
        }else{
            setMonth((prev) => prev - 1);
        }
    }, [month]);

    const clickNext = useCallback(() => {
        if(month === 12){
            setYear((prev) => prev + 1);
            setMonth(1);
        }else{
            setMonth((prev) => prev + 1)
        }
    }, [month]);

    const clickWrite = useCallback(() => {
        router.push('/diary/write');
    }, []);

    const handleSelectChange = useCallback((value) => {
        setSorted(value);
    }, [])

    return (
        <>
        <Head>
            <title>
                Diary
            </title>
        </Head>
        <HeaderLayout 
        extra={[
            <Button key="write" type='primary' onClick={clickWrite} style={{marginRight: '1.5rem'}}>?????? ??????</Button>,
            <Button key="prev" onClick={clickPrev}><LeftOutlined /> ?????? ???</Button>,
            <Button key="next" onClick={clickNext} ><RightOutlined /> ?????? ???</Button>
        ]} 
        title={"Diary"}
        subTitle={`${year}??? ${month}???`}/>
        <Select
            style={{margin: "1rem"}}
            onChange={handleSelectChange}
            defaultValue={"latest"}
            
        >
            <Select.Option value="latest">?????? ???</Select.Option>
            <Select.Option value="oldest">????????? ???</Select.Option>
        </Select>
        {sortedPosts&&sortedPosts.map((it) => (
            <DiaryCard post={it} key={it.id} />
        ))}
        </>
    );
};

export default Home;