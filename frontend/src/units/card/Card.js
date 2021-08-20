import React from 'react';
import {Card as PlaneCard, Typography} from 'antd';

const {Title, Text} = Typography;
export default function Card({width, label, value}) {
    return (
        <PlaneCard style={{ width }}>
            <Title level={4}>{value}</Title>
            <Text>{label}</Text>
  </PlaneCard>
    )
}
