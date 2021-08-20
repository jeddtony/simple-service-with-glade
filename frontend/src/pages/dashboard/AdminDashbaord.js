import React from 'react'
import {Drawer} from '../../units';
import {useAdminDashboard, useNetworks} from '../../hooks';
import {useQueryCache} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card} from '../../units';
import {Row, Col, Divider} from 'antd';
import {usePageValue} from '../../context';
import {NumberFormat} from '../../units';


export default function Dashboard() {
    const { status, data, error, isFetching } = useAdminDashboard();
    const network = useNetworks();
    const finalData = data? data : {};

    let {setPageLoading, setPageError, setPageSuccess, setMessage} = usePageValue();

    setPageLoading(isFetching)
    return (
        <>
        <Drawer selectedKey="01">
          <Row gutter={24}>
                
                    <Col xs={24} sm={24} md={6}>
  <Card label={"Airtime Transfers"} value={finalData.numberOfAirtimeTransfers} />
  </Col>

  <Col xs={24} sm={24} md={6}>
  <Card label={"Data Transfers"} value={finalData.dataTransfers} />
  </Col>

  {/* <Col xs={24} sm={24} md={6}>
  <Card label={"Complains Lodged"} value={finalData.numberOfComplaints} />
  </Col> */}
               
        </Row>
  
        <Row gutter={24} style={{marginTop: '20px'}}>
            <Divider orientation="left">Complains</Divider>
            <Col xs={24} sm={24} md={6}>
  <Card label={"Total Complains"} value={finalData.numberOfComplaints} />
  </Col>

  <Col xs={24} sm={24} md={6}>
  <Card label={"Unresolved Complains"} value={finalData.unresolvedComplains} />
  </Col>

  <Col xs={24} sm={24} md={6}>
  <Card label={"Resolved Complains"} value={finalData.resolvedComplaints} />
  </Col>
           
        </Row>
        </Drawer>
 <ReactQueryDevtools initialIsOpen />
 </>
    )
}
