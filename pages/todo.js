import { Button } from 'antd';
import React from 'react';
import HeaderLayout from '../components/HeaderLayout';


const TodoList = () => {
    return (
        <>
        <HeaderLayout
        extra={<Button type='primary'>추가하기</Button>}
        title={"Todo"}
        />
        </>
    );
};

export default TodoList;
