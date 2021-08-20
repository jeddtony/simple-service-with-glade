import React, {useState, useEffect} from 'react';
import {Row, Col, Form, Input, Button, InputNumber, Typography} from 'antd';
import {FormGroup, Select} from '../../units';
import {GladepayButton} from 'react-gladepay-2';
import {usePaymentRequestLink} from '../../hooks';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";

export default function MakePayment(props) {

  const {Title} = Typography;
  let url = props.match.params.url;

  let api = useApi();

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const { status, data, error, isFetching } = usePaymentRequestLink(url);

    const actualData = data? data.data : {};

    useEffect(() => {
      form.resetFields();
      return () => {}
    }, [actualData])

    const [details, setDetails] = useState({MID: "GP0000001", //Gladepay Merchant ID
    email: "demo@gmail.com",  // customer email
amount: 10000,//equals NGN100,
is_production: false //is_production,})
    })

    const onFinish = () => {

    }

    const callback = (response) => {
        console.log(response);
        console.log('this is the callback');
        console.log(formData);

        const postForm = async(formParams) => {
          let results = await api.makePayment(formParams);
          let {success, message} = results;
          if(success) {
            Swal.fire({
                title: `Payment successful!`,
                text: `You made a payment to ${actualData.user.name}`,
                icon: "success",
              }).then((value) => {
                form.resetFields();
                
                
              });
            } else {
              Swal.fire({
                title: `Error making payment!`,
                text: `${message}`,
                icon: "warning",
                button: "Close",
                dangerMode: true,
              });
            }
        }

        if(response.status == 200) {
          postForm({...formData, txn_ref: response.txnRef, payment_request_url: url});
      }
    }

    const onClose = () => {
        console.log("Payment closed");
    }

    return (
        <Row>
            <Col span="10"></Col>
            <Col span="6">
              <Title level="4">Logo</Title>
            <p>{actualData.name}</p>
            <p>BY {actualData.user? actualData.user.name : ''}</p>

            <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          remember: true,
          layout: "horizontal",
        }}

        onFinish={onFinish}
      >
          <FormGroup label="First Name" required={true} name="first_name"
        //   onChange={(e) => setStartLocation(e.target.value)}
        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          > 
         <Input />
        </FormGroup>

        <FormGroup label="Last Name" required={true} name="end_location"> 
        <Input 
         onChange={(e) => setFormData({...formData, last_name: e.target.value})}/>
        </FormGroup>

        <FormGroup label="Email" required={true} name="email"> 
        <Input 
        onChange={(e) => setFormData({...formData, email: e.target.value})}/>
        </FormGroup>

        <FormGroup label="Phone" required={true} name="phone"> 
        <Input 
        onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
        </FormGroup>

        <FormGroup label="Amount to pay" required={true} name="amount"
        initialValue={actualData.amount}> 
          {/* <Input type="number" disabled={true} placeholder="10000"
          style={{color: 'black'}}/> */}
          <InputNumber style={{ width: "100%", color: "black" }} 
                disabled 
            formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        </FormGroup>
{/* 
        <Row>
            
            <Col span="16">
            <Button type="primary" htmlType="submit" 
            loading={isLoading}
            disabled={isLoading}
            >
          Create Payment
        </Button>
            </Col>
        </Row> */}
      </Form>
       
      <GladepayButton
                text="Make Payment"
                className="payButton"
                onSuccess={callback}
                onClose={onClose}
                disabled={true}
                embed={true} 
                email={details.email}
                amount={actualData.amount}
                MID={details.MID}
                tag="button"
              />
            </Col>
        </Row>
    )
}


