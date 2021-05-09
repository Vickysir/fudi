import { APICollectShopList } from "@/pages/api/request";
import { message } from "antd";

let timeout;
let currentValue;

export function fetchPlacees(type, value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    async function fake() {
        console.log(`type`, type)
        switch (type) {
            case "1": //"Collect"
                {
                    const { data } = await APICollectShopList();
                    console.log(`object`, data)
                    const result = [];
                    data.forEach(r => {
                        result.push({
                            value: r.id,
                            label: r.address,
                        });
                    });
                    callback(result);
                }
                break;

            default: { //"Delivery"
                initPlaceService(value, (result) => {
                    const data = [];
                    result.forEach(r => {
                        data.push({
                            value: r.place_id,
                            label: r.description,
                        });
                    });
                    callback(data);
                });
            }
                break;
        }


    }
    timeout = setTimeout(fake, 300);
}
function initPlaceService(input, callback) {
    try {
        const google = window.google;
        console.log(`google`, google)

        const displaySuggestions = function (predictions, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
                alert(status);
                return;
            }
            console.log(`predictions`, predictions)
            callback(predictions)

        };
        const service = new google.maps.places.AutocompleteService();
        const irelandBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(50.999929, -10.854492),
            new google.maps.LatLng(55.354135, -5.339355)
        );
        service.getQueryPredictions({ input, bounds: irelandBounds, componentRestrictions: { country: "IE" } }, displaySuggestions);


    } catch (err) {
        console.log(`map err`, err)
        message.error("map service init error")
    }
}