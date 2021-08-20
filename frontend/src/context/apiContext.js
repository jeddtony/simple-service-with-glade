import React, {createContext, useContext, useState} from 'react';
import * as Api from '../api/Api';

const ApiContext = createContext();

const ApiProvider = ({children}) => {
    const [restApi, setRestApi] = useState(Api);

    return (
        <ApiContext.Provider value={Api}>
            {children}
        </ApiContext.Provider>
    )
}

const useApi = () => {
    const context = useContext(ApiContext);

    if(context === undefined){
        throw new Error('useApi must be used within a ApiProvider');
    }

    return context;
}

export {ApiProvider, useApi}