import React, { useEffect } from 'react'
import point from 'src/assets/images/common/map/point.svg'

const V_Map = (props) => {
    const { markerLatLng } = props;
    useEffect(() => {
        initMap()

    }, [markerLatLng])
    function initMap() {
        const google = window.google;
        const map = new google.maps.Map(document.getElementById("map"), {
            center: markerLatLng,
            zoom: 19,
        });
        new google.maps.Marker({
            position: markerLatLng,
            map,
            icon: point,
            draggable: false,
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

