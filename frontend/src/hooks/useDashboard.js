import React from 'react';
import {useQuery} from 'react-query';
// import {useApi} from '../context';
// import api from './api';
import {instance} from '../api/Api';


export  function useDashboard () {
    console.log('calling use dashboard');

return useQuery("dashboard", async () => {
        const {data} = await instance.get("dashboard");
        return data;
      });
}

export function useAdminDashboard () {
  console.log('calling use dashboard');

return useQuery("adminDashboard", async () => {
      const {data} = await instance.get("dashboard/admin");
      return data;
    });
}