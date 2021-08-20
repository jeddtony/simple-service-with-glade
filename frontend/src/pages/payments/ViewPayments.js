import React, {useMemo, useState} from 'react';
import {ButtonLink, Drawer, NumberFormat, PageTitle} from '../../units';
import { usePaymentHistory} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col, Button, Modal, Divider, Form, 
  Input, DatePicker, InputNumber} from 'antd';
import {ReactTable} from '../../units';
import {formatDate} from '../../helpers';


export default function ViewPayments() {
    const [refreshPage, setRefreshPage] = useState(0);
    const { status, data, error, isFetching } = usePaymentHistory();

    const [showModal, setShowModal] = useState(false);
    
    const actualData = data? data.data : [];
    
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Payment Date',
            accessor: d=> formatDate(d.created_at),
            Cell: d => <span>{d.value}</span>
    }, {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'Payment for',
        accessor: 'payment_request.name'
    },
    {
        Header: 'Full Url',
        accessor: 'payment_request.full_url'
    },
    {
        Header: 'Amount',
        accessor: 'payment_request.amount',
        Cell: d => <NumberFormat value={d.value} />
    }, 
    {
        Header: 'Action',
        accessor: 'id',
        Cell: d => (
            <ButtonLink to={"/payment-history/"+d.value} label="View" size="small" type="primary" />
        ),
        filterable: false
    },
    
],actualData )

   
    return (
        <>
          <Drawer selectedKey="02">
            <Card>
            <PageTitle title="Payments" />
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

