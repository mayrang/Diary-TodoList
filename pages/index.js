import React, { useCallback, useEffect, useState } from 'react';
import HeaderLayout from "../components/HeaderLayout"
import {Button, Select} from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';
import moment from 'moment';
import styled from 'styled-components';


const dummyDiary = [
    {
        id: 1,
        diaryDate: "2022-08-02",
        diaryContent: "안녕하세요 08월 02일 일기의 더미 데이터입니다^_^",
        diaryRate: 4.0,
        diaryWhether: ['Sunny', 'Hot'],
    },
    {
        id: 2,
        diaryDate: "2022-08-04",
        diaryContent: "안녕하세요 08월 04일 일기의 더미 데이터입니다..",
        diaryRate: 2.5,
        diaryWhether: ['Clody', 'Cool'],
    },
    {
        id: 3, 
        diaryDate: "2022-08-07",
        diaryContent: "안녕하세요 08월 07일 일기의 더미 데이터입니다.",
        diaryRate: 3.5,
        diaryWhether: ['Rainy', 'Hot'],
    },
    {
        id: 4,
        diaryDate: "2022-08-09",
        diaryContent: "안녕하세요 08월 09일 일기의 더미 데이터입니다. 08월의 눈이라니 지구멸망이다!!!",
        diaryRate: 5.0,
        diaryWhether: ['Snow', 'Cold'],
    },
    {
        id: 5,
        diaryDate: "2022-08-10",
        diaryContent: "안녕하세요 08월 10일 일기의 더미 데이터입니다.",
        diaryRate: 1.5,
        diaryWhether: ['Sunny', 'Cool'],
    }

]



const SelectWrapper = styled(Select)`
    display: inline-block;
    float: right;
    margin: 1rem;
`


const Home = () => {
    const [month, setMonth] = useState(parseInt(moment().format('MM')));
    const [year, setYear] = useState(parseInt(moment().format('YYYY')));
    const [sorted, setSorted] = useState("newest");
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        if(sorted === 'newest'){
            setSortedPosts(dummyDiary.sort((a, b) => parseInt(b.diaryDate.slice(-2)) - parseInt(a.diaryDate.slice(-2))));
        }else{
            setSortedPosts(dummyDiary.sort((a, b) => parseInt(a.diaryDate.slice(-2)) - parseInt(b.diaryDate.slice(-2))));
        }
    }, [sorted])

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

    const handleSelectChange = useCallback((value) => {
        setSorted(value);
    }, [])

    return (
        <>
        <HeaderLayout 
        extra={[
            <Button key="prev" onClick={clickPrev}><LeftOutlined /> 저번 달 일기</Button>,
            <Button key="next" onClick={clickNext}><RightOutlined /> 다음 달 일기</Button>
        ]} 
        title={"Diary"}
        subTitle={`${year}년 ${month}월`}/>
        <SelectWrapper
            onChange={handleSelectChange}
            value={sorted}
        >
            <Select.Option value="latest">최신 순</Select.Option>
            <Select.Option value="oldest">오래된 순</Select.Option>
        </SelectWrapper>
        </>
    );
};

export default Home;