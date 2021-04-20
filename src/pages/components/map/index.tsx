import React, { useEffect } from 'react'

const V_Map = () => {
    useEffect(() => {
        initMap()

    }, [])
    function initMap() {
        const google = window.google;
        const myLatLng = { lat: -25.363, lng: 131.044 };
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        new google.maps.Marker({
            position: myLatLng,
            map,
            title: "Hello World!",
            // icon:""
            draggable: true,
            animation: google.maps.Animation.DROP,
        });
    }
    return (
        <div
            id="map"
            style={{ width: "100%", height: "100%" }}
        >

        </div>
    )
}

export default V_Map

