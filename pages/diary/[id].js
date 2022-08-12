import { Card, Col, Rate, Row, Tag, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { LOAD_DIARY_POST } from '../../reducers/diary';
import wrapper from '../../store/configureStore';

const DiaryPost = () => {
    const {singlePost} = useSelector((state) => state.diary);
    const router = useRouter();

    const clickBack = useCallback(() => {
        router.back();
    }, []);
    return (
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
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => ({params}) => {
    store.dispatch({
        type: LOAD_DIARY_POST,
        id: params.id
    });
});

export default DiaryPost;