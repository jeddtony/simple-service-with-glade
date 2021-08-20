import React from 'react';
import ReactNumber from 'react-number-format';

export default function NumberFormat({value, ...props}) {
    return (
        <ReactNumber
        value={Number(value? value : 0).toFixed(2)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₦'}
        {...props}
    />
    )
}
