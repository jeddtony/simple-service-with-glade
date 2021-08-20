import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function useBooking () {
return useQuery("bookings", async () => {
        const {data} = await instance.get("bookings");
        return data;
      });
}