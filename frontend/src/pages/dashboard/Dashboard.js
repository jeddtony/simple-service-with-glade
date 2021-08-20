import React from 'react'
import {Drawer} from '../../units';
import {useDashboard, useNetworks} from '../../hooks';
import {useQueryCache} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card} from '../../units';
import {Row, Col, Divider} from 'antd';
import {usePageValue} from '../../context';
import {NumberFormat} from '../../units';


export default function Dashboard() {
    const { status, data, error, isFetching } = useDashboard();
    
    const finalData = data? data.data : {};
    // console.log(finalData);

    let {setPageLoading, setPageError, setPageSuccess, setMessage} = usePageValue();

    setPageLoading(isFetching)
    return (
        <>
        <Drawer selectedKey="01">
          <Row gutter={24}>
                
                    <Col xs={24} sm={24} md={6}>
  <Card label={"Payment Request"} value={finalData.payment_request_count} />
  </Col>

  <Col xs={24} sm={24} md={6}>
  <Card label={"Payments"} value={finalData.payment_count} />
  </Col>

               
        </Row>

        </Drawer>
 <ReactQueryDevtools initialIsOpen />
 </>
    )
}
