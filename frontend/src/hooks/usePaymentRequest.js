import {useQuery} from 'react-query';
import {instance} from '../api/Api';


export  function usePaymentRequests (refreshPage) {
return useQuery(`payment-requests-${refreshPage}`, async () => {
        const {data} = await instance.get("payment-links");
        return data;
      });
}

export  function usePaymentRequestLink (link) {
    return useQuery(`payment-requests-${link}`, async () => {
            const {data} = await instance.get(`payment-links/${link}`);
            return data;
          });
    }

    export  function usePaymentHistory () {
        return useQuery(`payment-history`, async () => {
                const {data} = await instance.get(`payment-history`);
                return data;
              });
        }

        export  function useOnePaymentHistory (id) {
            return useQuery(`payment-history-${id}`, async () => {
                    const {data} = await instance.get(`payment-history/${id}`);
                    return data;
                  });
            }
