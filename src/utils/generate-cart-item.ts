import isEmpty from "lodash/isEmpty";
import {BAZAAR_ADMIN_BASE_URL} from "@framework/utils/http";

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
  const { id, name, slug, image, price, sale_price } = item;
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
