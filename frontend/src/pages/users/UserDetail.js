import React, {useState} from 'react';
import {Card, Button, Row, Col, Avatar, Divider, Typography} from 'antd';
import {ButtonLink, Drawer, PageTitle, ReactTable, NumberFormat, Modal} from '../../units';
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {useOneUser, userOneUser} from '../../hooks';
import {formatDate} from '../../helpers';
import {MailOutlined, PhoneOutlined, WalletOutlined, UsergroupDeleteOutlined} from '@ant-design/icons'
import TopUp from "./modals/TopUp";

const {Text, Title} = Typography
export default function UserDetail(props) {
    let userId = props.match.params.id;
    const [showTopUp, setShowTopUp] = useState(false);
    const [refreshVariable, setRefreshVariable] = useState(0)
    const { status, data, error, isFetching } = useOneUser(userId, refreshVariable);
    let userDetail = data? data.user: {};
    let userComplain = data? data.userComplain: 0;
    let userAirtimeTransfer = data? data.userAirtimeTransfer: 0;
    let userDataTransfer = data? data.userDataTransfer: 0;

    return (
        <Drawer selectedKey="2">

         
            <Card>
            <Row>
                <Col xs={8} md={2}>
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
                </Col>
                <Col xs={14} md={20}>
                    <Title level={5}>{userDetail.name}</Title>
                    <MailOutlined /> : <Text>{userDetail.email}</Text>
                    &nbsp; &nbsp; &nbsp; &nbsp;<PhoneOutlined />: <Text>{userDetail.phone}</Text>
                </Col>
                <Col xs={2} md={2}>
                    <Button type="primary" onClick={()=> setShowTopUp(!showTopUp)}>Top Up</Button>
                </Col>
                <Divider />
    <StatCards label="Airtime Transfers" value={userAirtimeTransfer} icon={<UnorderedListOutlined style={{height: 'inherit'}}/>}/>
    <StatCards label="Data Transfers" value={userDataTransfer} icon={<WalletOutlined style={{height: 'inherit'}} />} />
    <StatCards label=" Complains" value={userComplain}  icon={<UsergroupDeleteOutlined style={{height: 'inherit'}} />}/>

            </Row>
            </Card>

           
        </Drawer>
    )
}


const StatCards = ({label, value, icon}) => {
    return (
        <Col xs={8} sm={8} md={4} style={{borderRight: '1px solid #EDEDED'}}>
        <Row gutter={2}>
            <Col span={8} style={{marginLeft: '5px'}}>
        <Title level={1} >{icon}</Title>
        </Col>
        <Col span={14}>
        <Title level={5} style={{marginBottom: '0px'}} >{label}</Title>
        <Title level={5} style={{marginTop: '0px'}}>{value}</Title>
        </Col>
        </Row>
    </Col>
    )
}
