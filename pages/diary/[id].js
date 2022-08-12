import { Card, Col, Rate, Row, Tag, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import {LOAD_DIARY_POST_REQUEST } from '../../reducers/diary';
import wrapper from '../../store/configureStore';

const DiaryPost = () => {
    const {singlePost, loadDiaryPostError} = useSelector((state) => state.diary);
    const router = useRouter();

    useEffect(() => {
        if(loadDiaryPostError){
            alert(loadDiaryPostError);
            router.replace('/')
        }
            
       
    }, [loadDiaryPostError])

    const clickBack = useCallback(() => {
        router.back();
    }, []);
    
    return (

        <>
        {JSON.stringify(singlePost) !== '{}'&&
        <>
        <PageHeader
        className='site-page-header'
        onBack={clickBack}
        title={`${singlePost.diaryDate.slice(5, 7)}월 ${singlePost.diaryDate.slice(8, 10)}일의 일기`}
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params}) => {
    store.dispatch({
        type: LOAD_DIARY_POST_REQUEST,
        id: params.id
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default DiaryPost;