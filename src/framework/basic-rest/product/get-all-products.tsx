import {Attachment, Product, ProductV2, QueryOptionsType} from "@framework/types";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import {httpV2} from "@framework/utils/http";
import {useInfiniteQuery} from "react-query";
import {getSlug, imageUrlV2} from "@utils/constants";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

const productsUrl = (query: string) => {
	return `${API_ENDPOINTS_V2.PRODUCT}?${query}`;
}

const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const qs = require('qs');
	const query = qs.stringify({
		populate: 'Image',
		pagination: {
			pageSize: 25,
			// page: 999, // TODO: Enter page number to fetch given page
		},
	}, {
		encodeValuesOnly: true, // prettify url
	});
	const { data } = await httpV2.get(productsUrl(query));

	return {
		data: transformProductV2ToV1(data.data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const transformProductV2ToV1 = (productsV2: ProductV2[]): Product[] => {
	return productsV2.map((productV2) => {
		let attachment: Attachment = {
			id: productV2.attributes.Image.data.id,
			thumbnail: imageUrlV2(productV2.attributes.Image.data.attributes.formats.thumbnail.url),
			original: imageUrlV2(productV2.attributes.Image.data.attributes.url),
		};
		return {
			id: productV2.id,
			name: productV2.attributes.Name,
			slug: getSlug(productV2.attributes.Name),
			price: productV2.attributes.Price,
			sale_price: productV2.attributes.SalePrice,
			quantity: 0,
			image: attachment,
		}
	});
}

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
