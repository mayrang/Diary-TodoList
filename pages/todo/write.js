import { Button, DatePicker, Form, Input, PageHeader } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO_POST_REQUEST } from "../../reducers/todo";


const TodoWrite = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {addTodoPostDone} = useSelector((state) => state.todo)

    useEffect(() => {
        if(addTodoPostDone){
            router.replace('/todo');
        }
    }, [addTodoPostDone])

    const clickBack = useCallback(() => {
        router.back();
    }, []);

    const clickSubmit = useCallback((value) => {
        console.log(parseInt(value.todoDate.format('YYYYMMDD')), parseInt(moment().format('YYYYMMDD')))
        if(parseInt(moment().format('YYYYMMDD')) > parseInt(value.todoDate.format('YYYYMMDD'))){
            alert("이전 날짜는 선택할 수 없습니다.");
            return;
        }
        const todoContent = value.todoContent;
        const todoDate = value.todoDate.format('YYYY-MM-DD');
        dispatch({
            type: ADD_TODO_POST_REQUEST,
            data: {todoContent, todoDate}
        });
        
        
    }, []);

    return (
        <>
        <PageHeader
            title="Todo 생성"
            onBack={clickBack}
        />
        <Form
            layout="vertical"
            onFinish={clickSubmit}
        >
            <Form.Item
                style={{margin: "2rem"}}
                label="Todo"
                name={"todoContent"}
                rules={[
                    {
                        required: true,
                        message: "내용은 필수로 작성하셔야 합니다."
                    }
                ]}
            >
                <Input.TextArea style={{height: 220, width: "100%"}}/>
            </Form.Item>
            <Form.Item
                style={{margin: "2rem"}}
                label="마감 날짜를 정해주세요"
                name={"todoDate"}
                rules={[
                    {
                        required: true,
                        message: "날짜를 선택해주세요"
                    }
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Button type="primary" htmlType="submit">저장하기</Button>
        </Form>
        </>
    );
};

export default TodoWrite;