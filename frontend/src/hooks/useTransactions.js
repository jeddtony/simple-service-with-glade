import { useQuery } from "react-query";
import { instance } from "../api/Api";

export function useDataTransactions() {
  return useQuery("dataTransactions", async () => {
    const { data } = await instance.get("transfers/data");
    return data;
  });
}

export function useAirtimeTransactions() {
  return useQuery("airtimeTransactions", async () => {
    const { data } = await instance.get("transfers/airtime");
    return data;
  });
}

export function useOneTransactions(transactionId) {
    return useQuery(transactionId, async () => {
      const { data } = await instance.get("transactions/details/"+transactionId);
      return data;
    });
  }
