export const CUSTOMER = "customer";
export const getSlug = ((text: string) => {
    return text.trim().toLowerCase().replace(/ +/g, '-')
});
