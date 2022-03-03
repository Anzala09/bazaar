import {Order, OrderV2} from "@framework/types";
import http, {httpV2} from "@framework/utils/http";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import {useQuery} from "react-query";

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ORDER}`);
  return data;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
    fetchOrder(id)
  );
};

export const fetchOrderV2 = async (_id: string) => {
  const {data} = await httpV2.get(`${API_ENDPOINTS_V2.ORDERS}/${_id}`);
  return data;
};
export const useOrderQueryV2 = (id: string) => {
  return useQuery<OrderV2, Error>([API_ENDPOINTS_V2.ORDERS, id], () =>
      fetchOrderV2(id)
  );
};
