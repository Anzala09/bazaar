import {Attachment, Product, ProductV2, QueryOptionsType} from "@framework/types";
import {API_ENDPOINTS, API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";
import {httpV2} from "@framework/utils/http";
import {useInfiniteQuery} from "react-query";
import {getSlug, imageUrlV2} from "@utils/constants";
import {getVariationsV2} from "@framework/utils/get-variations";

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
		populate: '*',
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
const getAttachment = (imageData) => {
	return {
		id: imageData.id,
		thumbnail: imageUrlV2(imageData.attributes.formats.thumbnail.url),
		original: imageUrlV2(imageData.attributes.url),
	};
};
const getVariationV1 = (variations) => {
	return []
		.concat(variations['size'])
		.concat(variations['color'])
		.map((variation) => {
		variation['attribute'] = variation['attributes'];
		return variation;
	});
}
const transformProductV2ToV1 = (productsV2: ProductV2[]): Product[] => {
	return productsV2.map((productV2) => {
		let attachment: Attachment = getAttachment(productV2.attributes.Image.data);
		let variations = getVariationsV2(productV2?.attributes?.sizes?.data, productV2?.attributes?.colors?.data);
		let oldVariations = getVariationV1(variations);
		return {
			id: productV2.id,
			name: productV2.attributes.Name,
			slug: getSlug(productV2.attributes.Name),
			price: productV2.attributes.Price,
			sale_price: productV2.attributes.SalePrice,
			quantity: 0,
			description: productV2.attributes.Description,
			variations: oldVariations,
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
