import React, { useCallback, useState } from 'react';
import HeaderLayout from "../components/HeaderLayout"
import {Button} from 'antd';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';
import moment from 'moment';


const Home = () => {
    const [month, setMonth] = useState(parseInt(moment().format('MM')));
    const [year, setYear] = useState(parseInt(moment().format('YYYY')));

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
    }, [month])

    return (
        <>
        <HeaderLayout 
        extra={[
            <Button key="prev" onClick={clickPrev}><LeftOutlined /> 저번 달 일기</Button>,
            <Button key="next" onClick={clickNext}><RightOutlined /> 다음 달 일기</Button>
        ]} 
        title={"Diary"}
        subTitle={`${year}년 ${month}월`}/>
        </>
    );
};

export default Home;