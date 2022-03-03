import {BAZAAR_ADMIN_BASE_URL} from "@framework/utils/http";

export const CUSTOMER = "customer";
export const getSlug = ((text: string) => {
    return text.trim().toLowerCase().replace(/ +/g, '-')
});
export const imageUrlV2 = (imagePath: string): string => {
    return `${BAZAAR_ADMIN_BASE_URL}${imagePath}`
};
