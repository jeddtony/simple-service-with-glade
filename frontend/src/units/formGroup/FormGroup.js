import React from 'react';
import {Form} from 'antd';
import 'antd/dist/antd.css';

export function FormGroup({name, onChange, label, required, ...props}) {
    return (
        <Form.Item
        name={name}
        label={<> {label}  </>}
        rules={ required? [
          {
            required: {required},
            message: 'This field is required',
          },
        ] : []}
        initialValue={props.initialValue}
        onChange={onChange}
      >
           {props.children}
        </Form.Item>
    )
}
