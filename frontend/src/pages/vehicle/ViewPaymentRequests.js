import React, {useMemo, useState} from 'react';
import {ButtonLink, Drawer, NumberFormat, PageTitle} from '../../units';
import {useVehicles, usePaymentRequests} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col, Button, Modal, Divider, Form, 
  Input, DatePicker, InputNumber} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';
import {ApiFilled, CreditCardOutlined, InsertRowBelowOutlined } from '@ant-design/icons'
import {FormGroup, Select} from '../../units';
import moment from 'moment';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";


export default function ViewPaymentRequests() {
    const [refreshPage, setRefreshPage] = useState(0);
    const { status, data, error, isFetching } = usePaymentRequests(refreshPage);

    const [showModal, setShowModal] = useState(false);
    const [showFirstPage, setShowFirstPage] = useState(true);
    const [showSecondPage, setShowSecondPage] = useState(false);
    
    const actualData = data? data.data : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date Added',
            accessor: d=> formatDate(d.created_at),
            Cell: d => <span>{d.value}</span>
    }, {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Full Url',
        accessor: 'full_url'
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: d => <NumberFormat value={d.value} />
    }, 
    {
        Header: 'Action',
        accessor: 'id',
        Cell: d => (
            <ButtonLink to={"/payment-history/"+d.value} label="View" size="small" type="primary" />
        ),
        filterable: false
    },
    
],actualData )

    const handlePaymentOption = () => {
        setShowFirstPage(false);
        setShowSecondPage(true);
    }
    return (
        <>
          <Drawer selectedKey="02">
              <Modal 
              visible={showModal}
              title="Create Payment Page"
              footer={''}
              onCancel={()=> setShowModal(!showModal)}>
                  {showFirstPage && <>
                  <Row gutter={24}>
                      <Col span="4">
                      <CreditCardOutlined />
                      </Col>
                      <Col span="12">
                        One Time Payment
                        <br />
                        Create a simple page for your customers to pay you
                      </Col>
                      <Col span="4">
                        <Button type="outline" size="small"
                        onClick={() => handlePaymentOption()}>
                            Choose
                        </Button>
                      </Col>
                  </Row>
                  <Divider />
                  <Row gutter={24}>
                      <Col span="4">
                      <InsertRowBelowOutlined />
                      </Col>
                      <Col span="12">
                        Subscription Payment
                        <br />
                        Create a page for reoccurring payments and subscription
                      </Col>
                      <Col span="4">
                        <Button type="outline" size="small">
                            Choose
                        </Button>
                      </Col>
                  </Row>
                  </>}
                  {
                      showSecondPage && (
                         <CreatePaymentDetails closeModal={setShowModal} 
                         refreshPage={setRefreshPage}/>
                      )
                  }
              </Modal>
            <Card>
                <Row gutter={24}>
                    <Col span={20}>
            <PageTitle title="Payments" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                {/* <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/vehicle/create" label="New Payment Request" /> */}
                <Button type="primary" size="small"
                onClick={() => setShowModal(!showModal)}>New Payment Request</Button>
                </Col>
            </Row>

            <ReactTable 
            columns={columns}
            data = {actualData}
            filterable={true}
            />

            </Card>
              </Drawer>  
              <ReactQueryDevtools initialIsOpen />
        </>
    )
}


const CreatePaymentDetails = ({closeModal, refreshPage}) => {

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    let api = useApi();

    const onFinish = (values) => {
        let formData = {
          name : values.name,
          description: values.description,
          amount: values.amount,
          expire_on: moment(values.expire_on).format('YYYY-MM-DD')
        }

        const postForm = async() => {
          let result = await api.createPaymentRequest(formData);
          let {success, message} = result;
          if(success) {
            Swal.fire({
                title: `Payment request created!`,
                text: `You created a payment with the name ${values.name}`,
                icon: "success",
              }).then((value) => {
                form.resetFields();
                refreshPage(Math.random() * 10)
                closeModal(false)
                
              });
            } else {
              Swal.fire({
                title: `Error create payment request!`,
                text: `${message}`,
                icon: "warning",
                button: "Close",
                dangerMode: true,
              });
            }
        }

        postForm();
    }

    return (
        <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          remember: true,
          layout: "horizontal",
        }}

        onFinish={onFinish}
      >
          <FormGroup label="Payment Name" required={true} name="name"
        //   onChange={(e) => setStartLocation(e.target.value)}
          > 
         <Input />
        </FormGroup>

        <FormGroup label="Description" required={true} name="description"> 
        <Input />
        </FormGroup>

        <FormGroup label="Amount to pay (₦)" required={true} name="amount"> 
          {/* <Input type="number" placeholder="10000"/> */}
          <InputNumber style={{ width: "100%", color: "black" }} 
                 
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
        </FormGroup>

        <FormGroup label="Payment link expires on" required={true} name="expire_on"> 
        <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      
    />
        </FormGroup>

        <Row>
            
            <Col span="16">
            <Button type="primary" htmlType="submit" 
            loading={isLoading}
            disabled={isLoading}
            >
          Create Payment
        </Button>
            </Col>
        </Row>
      </Form>
           
             
    )
}