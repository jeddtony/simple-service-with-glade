import React, {useState} from 'react'
import { Row, Col, Form, Input, Button, Checkbox, Alert, Typography } from 'antd';
import 'antd/dist/antd.css';
import {getLoginEmail, setLoginEmail, getLoginPassword, setLoginPassword} from '../../helpers'
import './login.css';
import {Link} from 'react-router-dom';

import {useApi} from '../../context';

const {Title} = Typography;
export default function Login() {
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  let api = useApi()

  const savedEmail = getLoginEmail();
  const savedPassword = getLoginPassword();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const marginBottom = {
    marginBottom: '20px'
  }

  const onFinish = values => {
    setIsLoading(true);

    if(values.remember) {
      setLoginEmail(values.email);
      setLoginPassword(values.password);
    }

    const data = {
      email : values.email,
      password: values.password
    }

    const postForm = async() => {
      let results = await api.postLogin(data);
      console.log(results);

      let {success} = results;
      setIsLoading(false);
      if(results.statusCode === 200) {
        let publicUrl = process.env.PUBLIC_URL;
        let loginPageUrl = null;
      
          loginPageUrl = publicUrl + '/dashboard';
        
        
        let origin = window.location.origin;
        if (window.location.origin === origin + loginPageUrl) return;
        window.location.href = loginPageUrl;
      }
      else{
        setIsFailed(true);
        setMessage(results.data)
      }
    }

    postForm();
  }

  
  return (
    <div>
      

     <Row gutter={24}>
       <Col xs={0} sm={0} md={12} lg={12} xl={12} >
        <img src="https://via.placeholder.com/400" style={{width: "100%", height: "100%"}} />
       </Col>
       <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
         <div className="container">
       
<Title level="3">Simple Service With Glade </Title>
{isFailed &&  (<Row style={marginBottom}>
        
        <Col span={24} >
    <Alert 
    message={message}
  //   description={message}
    type="error"
    showIcon
  />
  </Col>
  </Row>)
}
      <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      style={{width: '80%'}}
    >
             
      <Form.Item style={{marginLeft: '0px'}}
        label="Email"
        name="email"
        initialValue={savedEmail}
        // onChange={(value) => console.log(value.target.value)}
        // onValuesChange={(value)=> console.log('logging the value ' , value)}
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}

        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue={savedPassword}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {!isLoading? 'Login' : 'Loading'}
        </Button>

        <span style={{float: "right"}}><Link to="/register">Register</Link></span>
      </Form.Item>
    </Form>
  
      
         
         </div>
       </Col>
     </Row>

    
    </div>
  )
}
