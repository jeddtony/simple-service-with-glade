import React, {useState} from 'react'
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {Card, Form, Input, Button, Radio } from 'antd';
import {FormGroup} from '../../units';
import {useApi, usePageValue} from '../../context';
import {Redirect} from 'react-router-dom';

export default function CreateUser() {

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    let {setPageLoading, setPageError, setPageSuccess, setMessage} = usePageValue();
    setPageLoading(isLoading);
    let api = useApi();

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }


      const onFinish = values => {
        setIsLoading(true);

        let data = {
          name: values.name,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber
        };

        const postForm = async() => {
          let results = await api.createUser(data);
          console.log(results);
          setIsLoading(false);
          let {success} = results;
          setMessage(results.message)
          if(success){
            
            setPageSuccess(true);
            setTimeout(() => {
              setSuccess(true);
            }, 2000);
          } else{
           setPageError(true);
          }
        }
        postForm();
      }

    return (
        <Drawer selectedKey="2">
          {success && <Redirect to="/users" />}
            <Card>
<PageTitle title="Create User" />

<Form
        {...formItemLayout}
        layout={"horizontal"}
        form={form}
        initialValues={{
          remember: true,
          layout: "horizontal",
        }}

        onFinish={onFinish}
      >

<FormGroup label="Name" required={true} name="name"> 
          <Input placeholder="John" />
        </FormGroup>

<FormGroup label="Email" required={true} name="email">
          <Input placeholder="john@mail.com" />
        </FormGroup>

        <FormGroup label="Phone Number" required={true} name="phoneNumber">
          <Input placeholder="080 0000 000" />
        </FormGroup>

        <FormGroup label="Password" required={true} name="password">
          <Input.Password placeholder="password" visibilityToggle={true} />
        </FormGroup>

        <FormGroup label={null}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Create User
        </Button>
        </FormGroup>
          </Form>

</Card>
        </Drawer>
    )
}
