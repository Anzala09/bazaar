import {CategoriesQueryOptionsType, Category, CategoryV2} from "@framework/types";
import http from "@framework/utils/http";
import { httpV2 } from "@framework/utils/http";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const {
		data: { data },
	} = await http.get(API_ENDPOINTS.CATEGORIES);
	return { categories: { data: data as Category[] } };
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
	return useQuery<{ categories: { data: Category[] } }, Error>(
		[API_ENDPOINTS.CATEGORIES, options],
		fetchCategories
	);
};

export const fetchCategoriesV2 = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const {
		data: { data },
	} = await httpV2.get(API_ENDPOINTS_V2.CATEGORIES);
	return { categories: { data: data as CategoryV2[] } };
};
export const useCategoriesQueryV2 = (options: CategoriesQueryOptionsType) => {
	return useQuery<{ categories: { data: CategoryV2[] } }, Error>(
		[API_ENDPOINTS_V2.CATEGORIES, options],
		fetchCategoriesV2
	);
};
