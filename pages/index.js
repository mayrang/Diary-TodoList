import React, { useCallback, useEffect, useState } from 'react';
import HeaderLayout from "../components/HeaderLayout"
import {Button, Select} from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import DiaryCard from '../components/DiaryCard';
import {LOAD_DIARY_POSTS_REQUEST } from '../reducers/diary';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';



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
            setSortedPosts(copyPosts.sort((a, b) => parseInt(b.diaryDate.slice(-2)) - parseInt(a.diaryDate.slice(-2))));
        }else{
            setSortedPosts(copyPosts.sort((a, b) => parseInt(a.diaryDate.slice(-2)) - parseInt(b.diaryDate.slice(-2))));
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
        <HeaderLayout 
        extra={[
            <Button key="write" type='primary' onClick={clickWrite} style={{marginRight: '1.5rem'}}>일기 쓰기</Button>,
            <Button key="prev" onClick={clickPrev}><LeftOutlined /> 저번 달</Button>,
            <Button key="next" onClick={clickNext} ><RightOutlined /> 다음 달</Button>
        ]} 
        title={"Diary"}
        subTitle={`${year}년 ${month}월`}/>
        <Select
            style={{margin: "1rem"}}
            onChange={handleSelectChange}
            defaultValue={"latest"}
            
        >
            <Select.Option value="latest">최신 순</Select.Option>
            <Select.Option value="oldest">오래된 순</Select.Option>
        </Select>
        {sortedPosts&&sortedPosts.map((it) => (
            <DiaryCard post={it} key={it.id} />
        ))}
        </>
    );
};

export default Home;