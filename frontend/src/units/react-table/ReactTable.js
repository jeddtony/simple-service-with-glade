import React from 'react'
import Reacttable from 'react-table';
import 'react-table/react-table.css';

export default function ReactTable({...props}) {
    return (
        <div>
          <Reacttable 
          {...props}
          defaultFilterMethod = {(filter, row, column) => {
            const id = filter.pivotId || filter.id
            
            // TO COMPARE THEM i HAD TO CAST THEM ALL TO LOWER STRING
            return row[id] !== undefined ? (String(row[id]).toLowerCase()).includes(String(filter.value).toLowerCase()) : true
      
          } }
          /> 
        </div>
    )
}
