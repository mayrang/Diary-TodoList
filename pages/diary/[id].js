import { Card, Col, Rate, Row, Tag, PageHeader, Button } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {LOAD_DIARY_POST_REQUEST, REMOVE_DIARY_POST_REQUEST } from '../../reducers/diary';

const DiaryPost = () => {
    const {singlePost, loadDiaryPostError, removeDiaryPostError, removeDiaryPostDone} = useSelector((state) => state.diary);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_DIARY_POST_REQUEST,
            id: router.query.id
        });
    }, []);

    useEffect(() => {
        if(removeDiaryPostDone){
            router.replace('/');
        }
    }, [removeDiaryPostDone])

    useEffect(() => {
        if(loadDiaryPostError||removeDiaryPostError){
            alert(loadDiaryPostError||removeDiaryPostError);
            router.replace('/')
        }
            
       
    }, [loadDiaryPostError||removeDiaryPostError]);

    const clickRemove = useCallback(() => {
        dispatch({
            type: REMOVE_DIARY_POST_REQUEST,
            id: router.query.id
        })
    }, [])

    const clickBack = useCallback(() => {
        router.back();
    }, []);

    return (
        <>
        <Head>
            <title>
                {JSON.stringify(singlePost) !== '{}' ?
                `${singlePost.diaryDate} 일기`: '그 날의 일기'}
            </title>
        </Head>
        {JSON.stringify(singlePost) !== '{}'&&
        <>
        <PageHeader
        className='site-page-header'
        onBack={clickBack}
        title={`${singlePost.diaryDate.slice(5, 7)}월 ${singlePost.diaryDate.slice(8, 10)}일의 일기`}
        extra={<Button type={'primary'} danger onClick={clickRemove}>삭제하기</Button>}
        />
        <Card >
            <Card style={{marginBottom: "20px", fontSize: "1.3em"}}title="일기">
                {singlePost.diaryContent}
            </Card>
            <Row gutter={20}>
                <Col xs={24} md={12}>
                    <Card title="그 날의 기분 점수" style={{marginBottom: "20px"}}>
                        <Rate disabled  defaultValue={singlePost.diaryRate} />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="그 날의 날씨" style={{marginBottom: "20px"}}>
                        {singlePost.diaryTags&&singlePost.diaryTags.map((it) => (
                            <Tag key={it.whether} color={it.color}>{it.whether}</Tag>
                        ))}
                    </Card>
                </Col>
            </Row>
        </Card>
        </>}
        </>
    );
};

export default DiaryPost;