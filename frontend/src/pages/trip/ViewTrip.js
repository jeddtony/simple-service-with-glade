import React, {useMemo} from 'react';
import {ButtonLink, Drawer, NumberFormat, PageTitle} from '../../units';
import {useTrips} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';


export default function ViewTrips() {
    const { status, data, error, isFetching } = useTrips();
    
    const actualData = data? data.data : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date Added',
            accessor: d=> formatDate(d.created_at),
            Cell: d => <span>{d.value}</span>
    }, 
    {
        Header: 'Pick up location',
        accessor: 'start_location.name'
    },
    {
        Header: 'Destination',
        accessor: 'end_location.name'
    }, 
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: d => <NumberFormat value={d.value} />
    },
   
    
],actualData )

    return (
        <>
          <Drawer selectedKey="02">
            <Card>
                <Row gutter={24}>
                    <Col span={20}>
            <PageTitle title="Trips" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/trip/create" label="New Trip" />
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
