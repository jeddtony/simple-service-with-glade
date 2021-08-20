import React, {useMemo, useState} from 'react';
import {ButtonLink, Drawer, PageTitle, Modal, NumberFormat} from '../../units';
import {useBooking} from '../../hooks';
import { ReactQueryDevtools } from 'react-query-devtools';
import {Card, Row, Col, Button, Typography} from 'antd';
import {ReactTable} from '../../units';
import {formatDate, formatDateAndTime} from '../../helpers';

const {Text} = Typography;

export default function ViewTrips() {
    const { status, data, error, isFetching } = useBooking();
    
    const actualData = data? data.data : [];

    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    
    const handleButtonClick = (booking) =>{
        setSelectedData(booking);
        setShowModal(true);
    }
    const columns = useMemo(() => [
        {
            id: 'date',
            Header: 'Date booked',
            accessor: d=> formatDate(d.created_at),
            Cell: d => <span>{d.value}</span>
    }, 
    {
        Header: 'Customer',
        accessor: 'customer_name'
    },
    {
        Header: 'Pickup location',
        accessor: 'start_location.name'
    }, 
    {
        Header: 'Destination',
        accessor: 'end_location.name'
    },
    {
        Header: 'Vehicle',
        accessor: 'vehicle.name'
    },
    {
        Header: 'Departure time',
        accessor: 'trip.start_time',
        Cell: d => <span>{formatDateAndTime(d.value)}</span>
    },
    {
        Header: 'Ticket',
        accessor: 'ticket_code',
       
    },
    {
        id: 'action',
        Header: 'Action',
        accessor: d => d,
        Cell: d => (
            <Button type="primary" size="small" onClick={() => handleButtonClick(d.value)}>
                View
            </Button>
        ),
        filterable: false
    },
    
],actualData )

    return (
        <>
          <Drawer selectedKey="02">
              <Modal 
              title="Booking Details"
              visible={showModal} 
              onCancel={setShowModal}
              hideFooter={true}>
                  <ViewDetails booking={selectedData} />
              </Modal>
            <Card>
                <Row gutter={24}>
                    <Col span={20}>
            <PageTitle title="Booking" />
            </Col>
               <Col span={4} style={{padding: '10px'}}>
                <ButtonLink style={{borderRadius: '5px'}} type="primary" to="/booking/create" label="New Booking" />
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

const ViewDetails =({booking}) => {
    return (
        <Row>
            <LabelAndNames label="Date booked" value={formatDate(booking.created_at)}  backgroundColor = "#EBEBEB" />
            <LabelAndNames label="Customer" value={booking.customer_name}  backgroundColor = "#FFF" />
            <LabelAndNames label="Pickup location" value={booking.start_location.name}  backgroundColor = "#EBEBEB" />
            <LabelAndNames label="Destination" value={booking.end_location.name}  backgroundColor = "#FFF" />
            <LabelAndNames label="Amount" value={<NumberFormat value={booking.amount} />}  backgroundColor = "#EBEBEB" />
            <LabelAndNames label="Vehicle" value={booking.vehicle.name}  backgroundColor = "#FFF" />
            <LabelAndNames label="Seat" value={booking.seat.name}  backgroundColor = "#EBEBEB" />
        </Row>
    )
}


export const LabelAndNames = ({ label, value, backgroundColor }) => {
    return (
      <Col span="24" style={{ backgroundColor }}>
        <Text>{label}: </Text>
        <span style={{float: "right"}}>
        <Text strong> {value}</Text>
        </span>
      </Col>
      
    );
  };