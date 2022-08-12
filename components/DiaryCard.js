import React, { useCallback } from 'react';
import {Card, Rate, Tag} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const CardWrapper = styled(Card)`
    margin-top: 10px;
`

const DiaryCard = ({post}) => {
    const router = useRouter();

    const clickDiaryPost = useCallback(() => {
        router.push(`/diary/${post.id}`);
    }, []);

    return (
        <CardWrapper
            onClick={clickDiaryPost}
            title={post.diaryDate}
            type={'inner'}
            extra={<Rate disabled defaultValue={post.diaryRate} />}
        >
            {post.diaryTags.map((it) => (
                <Tag key={it.whether} color={it.color}>{it.whether}</Tag>
            ))}
        </CardWrapper>
    );
};

DiaryCard.propTypes = {
    post: PropTypes.object.isRequired,
}

export default DiaryCard;