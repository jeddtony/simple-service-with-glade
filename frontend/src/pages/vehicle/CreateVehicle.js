import React, {useState} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {Card, Form, Input, Button, Row, Col } from 'antd';
import {FormGroup} from '../../units';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";

export default function CreateVehicle() {

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    let api = useApi();

    const onFinish = values => {
        let formData = {
            name: values.bus_name,
            plate_num: values.plate_number,
            color: values.color,
            number_of_seats: values.num_of_seats
        }

        const postForm = async() => {
            setIsLoading(true);
            let results = await api.createVehicle(formData);
            let {success, message} = results;
            setIsLoading(false);
            console.log(results);
            if(success) {
                Swal.fire({
                    title: `Bus created!`,
                    text: `You created a bus with name ${values.bus_name} !`,
                    icon: "success",
                  }).then((value) => {
                    form.resetFields();
                    // setRedirect(true);
                  });
                } else {
                  Swal.fire({
                    title: `Error registering bus!`,
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

            <PageTitle title="Create Vehicle" />

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
          <FormGroup label="Name or Model" required={true} name="bus_name"> 
          <Input placeholder="Toyota Hiace Bus" />
        </FormGroup>

        <FormGroup label="Plate Number" required={true} name="plate_number"> 
          <Input placeholder="AAA-AAA-AAA" />
        </FormGroup>

        <FormGroup label="Color" required={true} name="color"> 
          <Input placeholder="White" />
        </FormGroup>

        <FormGroup label="Number of Seats" required={true} name="num_of_seats"> 
          <Input placeholder="4"  type="number" min="1"/>
        </FormGroup>

        <Row>
            <Col span="4"></Col>
            <Col span="16">
            <Button type="primary" htmlType="submit" loading={isLoading}
            disabled={isLoading}>
          Create Vehicle
        </Button>
            </Col>
        </Row>
      </Form>
            </Card>
        </Drawer>
    )
}
