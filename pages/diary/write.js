import { Button, Form, Input, PageHeader, Rate, Tag } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ADD_DIARY_POST_REQUEST } from '../../reducers/diary';
import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';

const whetherTags = [
    {whether: 'Sunny', color: 'red'},
    {whether: 'Cloudy', color: 'cyan'},
    {whether: 'Rainy', color: 'purple'},
    {whether: 'Snow', color: 'geekblue'},
    {whether: 'Hot', color: 'volcano'},
    {whether: 'Cool', color: 'green'},
    {whether: 'Cold', color: 'blue'},
]

const DiaryWrite = () => {
    const router = useRouter();
    const [selectedTags, setSelectedTags] = useState([]);
    const dispatch = useDispatch();
    const {addDiaryPostDone, addDiaryPostError} =useSelector((state) => state.diary);


    useEffect(() => {
        if(addDiaryPostDone){
            router.replace('/');
        }
    }, [addDiaryPostDone]);

    useEffect(() => {
        if(addDiaryPostError){
            alert(addDiaryPostError);
        }
    }, [addDiaryPostError]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

    const clickBack = useCallback(() => {
        router.back();
    }, []);

    const submitWrite = useCallback((value) => {
        if(selectedTags.length > 0){
            dispatch({
                type: ADD_DIARY_POST_REQUEST, 
                data:  {...value, diaryDate: moment().format('YYYY-MM-DD'),diaryTags: selectedTags}
            });
        }else{
            alert("오늘 날씨를 입력해주세요")
        }
     
    }, [selectedTags])

    return (
        <>
        <Head>
            <title>
                오늘은 어땠나요?
            </title>
        </Head>
        <PageHeader
        title="오늘의 일기"
        onBack={clickBack}
        subTitle={`${moment().format('YYYY')}년 ${moment().format('MM')}월 ${moment().format('DD')}일`}
        />
        <Form
        layout='vertical'
        onFinish={submitWrite}
        >
            <Form.Item
                style={{margin: '2rem'}}
                label="오늘은 어떤 일이 있었나요?"
                name="diaryContent"
                rules={[
                    {
                        required: true,
                        message: "오늘 어떤일이 있었는지 써주세요"
                    }
                ]}
            >
                <Input.TextArea style={{height: 220, width: "100%"}}/>
            </Form.Item>
            <Form.Item
                style={{margin: '2rem'}}
                label="오늘의 기분 지수"
                name="diaryRate"
                rules={[
                    {
                        required: true,
                        message: "기분 지수를 입력해주세요"
                    }
                ]}
            >
                <Rate allowHalf />
            </Form.Item>
            <Form.Item
                style={{margin: '2rem'}}
                label="오늘 날씨는 어땠나요?"
                required
            >
               {whetherTags.map((tag) => (
                <Tag.CheckableTag 
                    key={tag.whether}
                    checked={selectedTags.find((it) => it.whether === tag.whether)}
                    onChange={(checked) => handleChange(tag, checked)}
                >
                    {tag.whether}
                </Tag.CheckableTag>
               ))}
            </Form.Item>
            <Button style={{margin: '2rem'}} type="primary" htmlType='submit'>저장하기</Button>


        </Form>
        </>
    );
};

export default DiaryWrite;