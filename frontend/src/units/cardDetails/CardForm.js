import React from 'react';
import {Button, Form, Input, DatePicker} from 'antd';
import {FormGroup} from '../../units';
import {useApi, usePageValue} from '../../context';


export default function CardForm(props) {
    const api = useApi();

    let {setPageLoading, setPageError, setPageSuccess, setMessage} = usePageValue();
    const [form] = Form.useForm();

    const onFinish = values => {
        const data = {
            amount: values.amount,
            user: props.user
        }

        console.log('submitting card');
        props.showSuccess(true);

        props.closeModal(false);

        const postForm = async() => {
            let results = await api.topUpWallet(props.data);
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
        // postForm();
    }

    return (
        <div>

            
           <Form
           id="cardForm"
           layout="vertical" 
            form={form}
            onFinish={onFinish}
            >
            <FormGroup name="cardName" label="Name on Card">
                 <Input placeholder="XXXX XXXX XXXX XXXX" />
            </FormGroup>

            <FormGroup name="cardMonth" label="Expiry Date">
                 <DatePicker picker="month" />
            </FormGroup>

            <FormGroup name="cvv" label="CVV">
                 <Input placeholder="123" type="number" />
            </FormGroup>

            </Form>
        </div>
    )
}
