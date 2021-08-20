import React, {useState} from 'react';
import {ButtonLink, Drawer, NumberFormat, PageTitle} from '../../units';
import {Card, Form, Input, Button, Row, Col, DatePicker, Select as AntdSelect, Modal as ConfirmModal } from 'antd';
import {FormGroup, Select} from '../../units';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";
import {useLocations, useVehicles, useSeats, 
        useTripByDate} from '../../hooks';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const {Option} = AntdSelect;

const {confirm} = ConfirmModal;

export default function CreateLocation() {


    const [deptDate, setDeptDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedVehicle, setSelectedVehicle] = useState();
    const [redirect, setRedirect] = useState(false);
    const [selectedTripAmount, setSelectedTripAmount] = useState()
    const { status, data, error, isFetching } = useTripByDate(deptDate);


    const vehicleResults = useVehicles();
    const vehicleData = vehicleResults.data? vehicleResults.data.data : [];

    const stateData = data? data.data : [];
    const seatResults = useSeats(selectedVehicle);
    const seatData = seatResults.data? seatResults.data.data : [];

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    let api = useApi();

    const handleTripChange = (value) => {
        
       stateData.map(stat => {
            if(stat.id == value){
                console.log(stat.amount)
                setSelectedTripAmount(stat.amount)
            }
        }
            );
    }
    
    const onFinish = values => {
        let formData = {
            customer_name: values.customer_name,
            trip_id: values.trip_id,
            vehicle_id: values.vehicle,
            seat_id: values.seat_id,
            start_time: moment(values.dept_time).format('YYYY-MM-DD HH:mm:ss')
        }


        function showConfirm() {
            confirm({
              title: 'Make payment?',
              icon: <ExclamationCircleOutlined />,
              content: (<span>You are about to pay {<NumberFormat value={selectedTripAmount} />} </span>),
              onOk() {
               postForm();
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }


        const postForm = async() => {
            setIsLoading(true);
            let results = await api.createBooking(formData);
            let {success, message} = results;
            setIsLoading(false);
            console.log(results);
            if(success) {
                Swal.fire({
                    title: `Trip created!`,
                    // text: `You created a trip from ${values.start_location} with name ${values.end_location} !`,
                    icon: "success",
                  }).then((value) => {
                    form.resetFields();
                    setRedirect(true);
                  });
                } else {
                  Swal.fire({
                    title: `Error creating location!`,
                    text: `${message}`,
                    icon: "warning",
                    button: "Close",
                    dangerMode: true,
                  });
                }
        }

        showConfirm()
    }

    const formItemLayout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }

    return (
        <Drawer>
            <Card>
        {redirect && <Redirect to="/booking" />}
            <PageTitle title="Book a seat" />

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

    <FormGroup label="Day of Travel" required={true} name="dept_time"> 
        <DatePicker
      format="YYYY-MM-DD"
      onChange={(e) => setDeptDate( moment(e).format('YYYY-MM-DD'))}
    //   showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
    />
        </FormGroup>

          <FormGroup label="Select trip" required={true} name="trip_id"
        //   onChange={(e) => setStartLocation(e.target.value)}
          > 
         <AntdSelect 
        
        showSearch
        onChange={e => handleTripChange(e)}
        optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
        >
            {
                stateData && 
                stateData.map (child => (
                    <Option value={child.id}>{child.start_location.name + ' to ' + child.end_location.name}</Option>
                ))
            }
        </AntdSelect> 
        </FormGroup>

        <FormGroup label="Customer Name" required={true} name="customer_name"> 
            <Input placeholder="John Doe"/>
        </FormGroup>

        <FormGroup label="Vehicle" required={true} name="vehicle"> 
          <Select 
          onChange={e => setSelectedVehicle(e)}
          >
                {vehicleData}
          </Select>
        </FormGroup>

        <FormGroup label="Available Seats" required={true} name="seat_id"> 
          <Select>
                {seatData}
          </Select>
        </FormGroup>

        <Row>
            <Col span="4"></Col>
            <Col span="16">
            <Button type="primary" htmlType="submit" loading={isLoading}
            disabled={isLoading}>
          Make Payment
        </Button>
            </Col>
        </Row>
      </Form>
            </Card>
        </Drawer>
    )
}
