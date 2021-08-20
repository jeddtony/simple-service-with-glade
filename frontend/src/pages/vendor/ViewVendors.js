import React, {useMemo} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {useNetworks} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';


export default function ViewVendors() {
    const { status, data, error, isFetching } = useNetworks();
    
    const actualData = data? data.networks : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date Added',
            accessor: d=> formatDate(d.createdAt),
            Cell: d => <span>{d.value}</span>
    }, {
        Header: 'Name',
        accessor: 'name'
    },
    // {
    //     Header: 'Email',
    //     accessor: 'email'
    // }, 
    // {
    //     Header: 'Phone Number',
    //     accessor: 'phoneNumber'
    // },
    // {
    //     id: 'contacts',
    //     Header: 'No. of Contacts',
    //     accessor: d => d.user_contacts[0]? d.user_contacts[0].count : 0,
    //     Cell: d => <span>{d.value}</span>
    // },
    {
        id: 'action',
        Header: 'Action',
        accessor: d => d,
        Cell: d => (
            <ButtonLink to={"/vendors/"+d.value.name} label="View Bundles" size="small" type="primary" />
        ),
        filterable: false
    },
    
],actualData )

    return (
        <>
          <Drawer selectedKey="021">
            <Card>
                <Row gutter={24}>
                    <Col span={20}>
            <PageTitle title="Vendors" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/vendors/create" label="New Vendor" />
                </Col>
            </Row>

            <ReactTable 
            columns={columns}
            filterable={true}
            data={actualData}
            />

            </Card>
              </Drawer>  
              <ReactQueryDevtools initialIsOpen />
        </>
    )
}
