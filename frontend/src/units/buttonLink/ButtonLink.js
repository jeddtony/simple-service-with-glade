import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from 'antd'

export default function ButtonLink({to,label, ...props}) {
    return (
        <Link to={to}>
            <Button {...props}>
                {label}
            </Button>
        </Link>
    )
}
