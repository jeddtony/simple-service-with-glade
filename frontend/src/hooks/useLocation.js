import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useProvinces () {
return useQuery("province", async () => {
        const {data} = await instance.get("states");
        return data;
      });
}

export  function useLocations () {
    return useQuery("locations", async () => {
            const {data} = await instance.get("locations");
            return data;
          });
    }

export  function useLocationExcept (locationId) {
    return useQuery(`location-${locationId}`, async () => {
            const {data} = await instance.get(`locations/except/${locationId}`);
            return data;
            });
}