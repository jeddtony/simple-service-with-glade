import React, {useMemo} from 'react';
import {ButtonLink, Drawer, PageTitle} from '../../units';
import {useUsers} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';


export default function ViewUsers() {
    const { status, data, error, isFetching } = useUsers();
    
    const actualData = data? data.users : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date Added',
            accessor: d=> formatDate(d.createdAt),
            Cell: d => <span>{d.value}</span>
    }, {
        Header: 'Name',
        accessor: 'name'
    },{
        Header: 'Email',
        accessor: 'email'
    }, 
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
            <PageTitle title="Users" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/users/create" label="New User" />
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
