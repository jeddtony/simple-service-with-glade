import React, {useState} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {Card, Form, Input, Button, Row, Col } from 'antd';
import {FormGroup, Select} from '../../units';
import {useApi, usePageValue} from '../../context';
import Swal from "sweetalert2";
import {useProvinces} from '../../hooks';

export default function CreateLocation() {

    const { status, data, error, isFetching } = useProvinces();

    const stateData = data? data.data : [];

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    let api = useApi();

    const onFinish = values => {
        let formData = {
            name: values.bus_name,
            state_id: values.state_id
        }

        const postForm = async() => {
            setIsLoading(true);
            let results = await api.createLocation(formData);
            let {success, message} = results;
            setIsLoading(false);
            console.log(results);
            if(success) {
                Swal.fire({
                    title: `Location created!`,
                    text: `You created a location with name ${values.bus_name} !`,
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

            <PageTitle title="Create Location" />

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
          <FormGroup label="Name of Town / City" required={true} name="bus_name"> 
          <Input placeholder="Onitsha" />
        </FormGroup>

        <FormGroup label="State" required={true} name="state_id"> 
          <Select>
                {stateData}
          </Select>
        </FormGroup>

        <Row>
            <Col span="4"></Col>
            <Col span="16">
            <Button type="primary" htmlType="submit" loading={isLoading}
            disabled={isLoading}>
          Create Location
        </Button>
            </Col>
        </Row>
      </Form>
            </Card>
        </Drawer>
    )
}
