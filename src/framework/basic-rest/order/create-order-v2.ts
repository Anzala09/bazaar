import {httpV2} from "@framework/utils/http";
import {API_ENDPOINTS_V2} from "@framework/utils/api-endpoints";

export const createOrder = async (stringifiedJson: string) => {
    const {data} = await httpV2.post(API_ENDPOINTS_V2.ORDERS, stringifiedJson);
    return data;
};
export const createOrderRequest = async (items: any, total: number, input: any) => {
    let json = createJsonPayload(items, total, input);
    return await createOrder(json);
};

function createJsonPayload(items: any, total: number, input: any) {
    let json = {
        "data": {
            "FirstName": input.firstName,
            "LastName": input.lastName,
            "MobileNumber": input.phone,
            "Email": input.email,
            "Address": input.address,
            "City": input.city,
            "Postcode": input.zipCode,
            "OrderNote": input.note,
            "Total": total,
            "Date": Date.now(),
            "OrderDetails": items
        }
    }

    return JSON.stringify(json);
}
