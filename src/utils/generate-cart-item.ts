import isEmpty from "lodash/isEmpty";
import {BAZAAR_ADMIN_BASE_URL} from "@framework/utils/http";
import {getSlug, imageUrlV2} from "@utils/constants";

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, attributes: object) {
  let {id, name, slug, image, price, sale_price} = item;

  id = id ?? item?.data?.id
  name = name ?? item?.data?.attributes?.Name
  slug = slug ?? getSlug(item?.data?.attributes.Name)
  image = image ?? `${BAZAAR_ADMIN_BASE_URL}${item.data?.attributes?.Image?.data?.attributes?.formats?.thumbnail?.url}`
  image = image ?? `${imageUrlV2(item.data?.attributes?.Image?.data?.attributes?.formats?.thumbnail?.url)}`
  price = price ?? parseInt(item?.data?.attributes.Price)
  sale_price = sale_price ?? parseInt(item?.data?.attributes.SalePrice)

  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    name,
    slug,
    image: image?.thumbnail ?? `${BAZAAR_ADMIN_BASE_URL}${item.data?.attributes?.Image?.data?.attributes?.formats?.thumbnail?.url}`,
    price: sale_price ? sale_price : price,
    attributes,
  };
}
