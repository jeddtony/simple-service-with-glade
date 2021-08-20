import React, {useState} from 'react'
import { Row, Col, Form, Input, Button, Checkbox, Alert, Typography } from 'antd';
import 'antd/dist/antd.css';
import {getLoginEmail, setLoginEmail, getLoginPassword, setLoginPassword} from '../../helpers'
import './login.css';
import {Link} from 'react-router-dom';

import {useApi} from '../../context';

const {Title} = Typography;
export default function Register() {
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

    const data = {
    name: values.name,
      email : values.email,
      phone: values.phoneNumber,
      password: values.password
    }

    const postForm = async() => {
      let results = await api.register(data);
      console.log(results);

      let successStatus = results.success;
      setIsLoading(false);
      if(successStatus) {
          let data = results.data;
          // setMessage(`Your login details are \n user id: ${data.userId} \n password: ${data.password}`);
          setMessage('Registration Successful');
          setSuccess(true)
        // let publicUrl = process.env.PUBLIC_URL;
        // let loginPageUrl = null;
      
        //   loginPageUrl = publicUrl + '/dashboard';
        
        
        // let origin = window.location.origin;
        // if (window.location.origin === origin + loginPageUrl) return;
        // window.location.href = loginPageUrl;
      }
      else{
        setIsFailed(true);
        setMessage(results.message)
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
       
<Title level="3"> Simple Service With Glade </Title>
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

{success && (
    <Row style={marginBottom}>
        
    <Col span={24} >
<Alert 
message={message}
//   description={message}
type="success"
showIcon
/>
</Col>
</Row>
)}
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
        label="Name"
        name="name"
        // onChange={(value) => console.log(value.target.value)}
        // onValuesChange={(value)=> console.log('logging the value ' , value)}
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}

        
      >
        <Input />
      </Form.Item>
             
      <Form.Item style={{marginLeft: '0px'}}
        label="Email"
        name="email"
        // onChange={(value) => console.log(value.target.value)}
        // onValuesChange={(value)=> console.log('logging the value ' , value)}
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input type="email"/>
      </Form.Item>

      
                   
      <Form.Item style={{marginLeft: '0px'}}
        label="Password"
        name="password"
        // onChange={(value) => console.log(value.target.value)}
        // onValuesChange={(value)=> console.log('logging the value ' , value)}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}

        
      >
        <Input.Password/>
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {!isLoading? 'Sign Up' : 'Loading'}
        </Button>

        <span style={{float: "right"}}><Link to="/login">Login</Link></span>
      </Form.Item>
    </Form>
  
      
         
         </div>
       </Col>
     </Row>

    
    </div>
  )
}
