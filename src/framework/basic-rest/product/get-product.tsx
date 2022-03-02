import {Product, ProductV2} from "@framework/types";
import http, {httpV2} from "@framework/utils/http";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (_slug: string) => {
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}`);
	return data;
};
export const useProductQuery = (slug: string) => {
	return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
		fetchProduct(slug)
	);
};

export const fetchProductV2 = async (_id: number) => {
	const { data } = await httpV2.get(`${API_ENDPOINTS_V2.PRODUCT}/${_id}?populate=*`);
	return data;
};
export const useProductQueryV2 = (id: number) => {
	return useQuery<ProductV2, Error>([API_ENDPOINTS_V2.PRODUCT, id], () =>
		fetchProductV2(id)
	);
};
