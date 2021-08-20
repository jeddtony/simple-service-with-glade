import React from 'react';
import {LoadingOutlined} from '@ant-design/icons';

export default function Loading() {
    return (
        <div style={{zIndex: "99", width: "150px", position: "fixed", borderRadius: "5px", backgroundColor:"#FFF", padding: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginLeft: '40%', marginTop: "20px"}}>
             
        <div> {<LoadingOutlined />} Loading</div>
        
       
        </div>
    )
}
