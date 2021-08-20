import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useTrips () {
return useQuery("trips", async () => {
        const {data} = await instance.get("trips");
        return data;
      });
}

export  function useTripByDate (date) {
    return useQuery(`trips-${date}`, async () => {
            const {data} = await instance.get(`trips?date=${date}`);
            return data;
          });
    }
