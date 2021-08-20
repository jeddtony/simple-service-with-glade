import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export function useNetworks () {

return useQuery("networks", async () => {
        const {data} = await instance.get("networks");
        return data;
      });
}

export function useOneNetworks (id) {

  return useQuery(`networks${id}`, async () => {
          const {data} = await instance.get(`networks/${id}`);
          return data;
        });
  }