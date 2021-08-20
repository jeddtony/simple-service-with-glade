import React, {useState} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {Card, Form, Input, Button, Row, Col, DatePicker } from 'antd';
import {FormGroup, Select} from '../../units';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";
import {useLocations, useVehicles, useLocationExcept} from '../../hooks';
import moment from 'moment';

export default function CreateLocation() {


    const [startLocation, setStartLocation] = useState();
    const { status, data, error, isFetching } = useLocations();
    const destinationResults = useLocationExcept(startLocation);

    const vehicleResults = useVehicles();

    const stateData = data? data.data : [];
    const vehicleData = vehicleResults.data? vehicleResults.data.data : [];
    const destinationData = destinationResults.data? destinationResults.data.data : [];

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    let api = useApi();

    
    const onFinish = values => {
        let formData = {
            start_location_id: values.start_location,
            end_location_id: values.end_location,
            vehicle_id: values.vehicle,
            amount: values.amount,
            start_time: moment(values.dept_time).format('YYYY-MM-DD HH:mm:ss')
        }

        const postForm = async() => {
            setIsLoading(true);
            let results = await api.createTrip(formData);
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
                    // setRedirect(true);
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

        postForm()
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

            <PageTitle title="Create Trip" />

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
          <FormGroup label="Pick up location" required={true} name="start_location"
        //   onChange={(e) => setStartLocation(e.target.value)}
          > 
          <Select 
          onChange={(e) => setStartLocation(e)}
          >
                {stateData}
          </Select>
        </FormGroup>

        <FormGroup label="Destination" required={true} name="end_location"> 
          <Select>
                {destinationData}
          </Select>
        </FormGroup>

        <FormGroup label="Cost of trip" required={true} name="amount"> 
          <Input type="number" placeholder="10000"/>
        </FormGroup>

        <FormGroup label="Departure time" required={true} name="dept_time"> 
        <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
    />
        </FormGroup>

        <Row>
            <Col span="4"></Col>
            <Col span="16">
            <Button type="primary" htmlType="submit" loading={isLoading}
            disabled={isLoading}>
          Create Trip
        </Button>
            </Col>
        </Row>
      </Form>
            </Card>
        </Drawer>
    )
}
