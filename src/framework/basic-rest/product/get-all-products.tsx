import {Attachment, Product, ProductV2, QueryOptionsType} from "@framework/types";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import {httpV2} from "@framework/utils/http";
import {useInfiniteQuery} from "react-query";
import {getSlug, imageUrlV2} from "@utils/constants";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await httpV2.get(`${API_ENDPOINTS_V2.PRODUCT}?populate=Image`);
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
