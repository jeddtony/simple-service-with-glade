import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useBundles (networkName) {

return useQuery(networkName, async () => {
        const {data} = await instance.get("networks/name/"+networkName);
        return data;
      });
}

export  function useOneBundle (id) {

  return useQuery(`bundle${id}`, async () => {
          const {data} = await instance.get("bundles/"+id);
          return data;
        });
  }