import React from 'react';
import {Button, Form, Input} from 'antd';
import {FormGroup} from '../../../units';
import {useApi, usePageValue} from '../../../context';


export default function TopUp(props) {
    const api = useApi();

    let {setPageLoading, setPageError, setPageSuccess, setMessage} = usePageValue();
    const [form] = Form.useForm();

    const onFinish = values => {
        const data = {
            amount: values.amount,
            user: props.user
        }

        const postForm = async() => {
            let results = await api.topUpWallet(data);
            console.log(results);
            let {success} = results;
            if (success) {
                form.resetFields();
                setMessage(results.message);
                setPageSuccess(true);

                setTimeout(() => {
                    setPageSuccess(false)
                    props.refreshVariable(Math.random() * 100)
                    props.closeModal(false);
                 
                    
                }, 2000);
            }
        }
        postForm();
    }

    return (
        <div>

            Current Amount: {props.currentBalance}
           <Form
           id="topUpForm"
           layout="vertical" 
            form={form}
            onFinish={onFinish}
            >
            <FormGroup name="amount" label="Amount">
                 <Input placeholder="5" type="number" />
            </FormGroup>

            </Form>
        </div>
    )
}
