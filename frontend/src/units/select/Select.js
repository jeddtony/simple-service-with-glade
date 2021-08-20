import React from 'react';
import {Select} from 'antd';

export default function CustomSelect({children, onChange, ...props}) {
    const {Option} = Select
    return (
        <Select 
        {...props}
        showSearch
        onChange={(e) => onChange(e)}
        optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
        >
            {
                children && 
                children.map (child => (
                    <Option value={child.id}>{child.name}</Option>
                ))
            }
        </Select>
    )
}
