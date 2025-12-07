console.log("Map.js Loaded");

const mapDiv = document.getElementById("map");

if (mapDiv) {
    const raw = mapDiv.dataset.geometry;
    console.log("Raw GeoData:", raw);

    let listingGeometry = null;

    try {
        listingGeometry = JSON.parse(raw);
        console.log("Parsed Geometry:", listingGeometry);
    } catch (e) {
        console.error("JSON Parse Error:", e);
    }

    // Only run if geometry is valid AND maplibregl loaded
    if (listingGeometry &&
        Array.isArray(listingGeometry.coordinates) &&
        listingGeometry.coordinates.length === 2 &&
        typeof maplibregl !== "undefined") {

        const map = new maplibregl.Map({
            container: "map",
            style: `https://api.maptiler.com/maps/outdoor/style.json?key=JuPqsWudFBORAxN3mUCg`,
            center: listingGeometry.coordinates,
            zoom: 12,
        });

        // ⭐ Popup with dynamic data from show.ejs
        const popup = new maplibregl.Popup({ offset: 25 })
            .setHTML(`
                <h4>${window.popupData.title}</h4>
                <p>${window.popupData.location}</p>
            `);

        // ⭐ Add marker with popup
        new maplibregl.Marker()
            .setLngLat(listingGeometry.coordinates)
            .setPopup(popup)
            .addTo(map);
    }
}
