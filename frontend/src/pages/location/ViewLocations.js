import React, {useMemo} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {useLocations} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';


export default function ViewLocations() {
    const { status, data, error, isFetching } = useLocations();
    
    const actualData = data? data.data : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date Added',
            accessor: d=> formatDate(d.created_at),
            Cell: d => <span>{d.value}</span>
    }, {
        Header: 'Name of Place',
        accessor: 'name'
    },
    {
        Header: 'State',
        accessor: 'state.name'
    }, 
    {
        Header: 'Action',
        accessor: 'id',
        Cell: d => (
            <ButtonLink to={"/users/"+d.value} label="View" size="small" type="primary" />
        ),
        filterable: false
    },
    
],actualData )

    return (
        <>
          <Drawer selectedKey="02">
            <Card>
                <Row gutter={24}>
                    <Col span={20}>
            <PageTitle title="Locations" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/location/create" label="New Location" />
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
