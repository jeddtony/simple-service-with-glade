import React from 'react'
import PropTypes from 'prop-types'
import {Form, Row, Col, Input, Button, Select, Modal} from 'antd';
import 'antd/dist/antd.css';

function ModalWrapper({visible, title, formId, onCancel, hideFooter, ...props}) {
    return (
        <Modal 
        visible={visible}
        title={title}
       //  onOk={this.handleOk}
        onCancel={() => onCancel(!visible)}
        footer={!hideFooter? [
         <Button key="back" 
          onClick={() => onCancel(!visible)}
          >
            Return
          </Button>,
          <Button key="submit" type="primary" 
         //  loading={loading} 
        //  onClick={() => document.forms[`${formId}`].onFinish}
        form={`${formId}`} htmlType="submit" key="submit"
          >
            Submit
          </Button>,
        ] : ''}
        >
      {props.children}
       </Modal>
    )
}

ModalWrapper.propTypes = {

}

export default ModalWrapper

