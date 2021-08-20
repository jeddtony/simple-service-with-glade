import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useContacts () {
return useQuery("contacts", async () => {
        const {data} = await instance.get("contacts");
        return data;
      });
}