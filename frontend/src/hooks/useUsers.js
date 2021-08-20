import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useUsers () {
    console.log('calling use users');

return useQuery("users", async () => {
        const {data} = await instance.get("users");
        return data;
      });
}

export  function useOneUser (id, refreshVariable) {
  console.log('calling one users');

return useQuery("user"+id+ "" +refreshVariable, async () => {
      const {data} = await instance.get(`users/${id}`);
      return data;
    });
}