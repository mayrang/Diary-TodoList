import React from 'react';
import {Card, Rate, Tag} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardWrapper = styled(Card)`
    margin-top: 10px;
`

const DiaryCard = ({post}) => {
    return (
        <CardWrapper
            title={post.diaryDate}
            type={'inner'}
            extra={<Rate disabled defaultValue={post.diaryRate} />}
        >
            {post.diaryWhether.map((it) => (
                <Tag key={it}>{it}</Tag>
            ))}
        </CardWrapper>
    );
};

DiaryCard.propTypes = {
    post: PropTypes.object.isRequired,
}

export default DiaryCard;