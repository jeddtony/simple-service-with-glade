import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useComplaints () {
return useQuery("complaints", async () => {
        const {data} = await instance.get("complaints");
        return data;
      });
    }

    export  function useAdminComplaints (refreshPage) {
        return useQuery(`adminComplaints${refreshPage}`, async () => {
                const {data} = await instance.get("complaints/admin");
                return data;
              });
            }