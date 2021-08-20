import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useVehicles () {
return useQuery("vehicles", async () => {
        const {data} = await instance.get("vehicles");
        return data;
      });
}


export  function useSeats (vehicleId) {
    return useQuery(`seats-${vehicleId}`, async () => {
            const {data} = await instance.get(`/vehicle/${vehicleId}/seats`);
            return data;
          });
    }