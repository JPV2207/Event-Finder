// middlewares/validateLatLng.js
export function validateLatLng(req, res, next) {
  try {
    let lat, lng;

    if (
      req.body.location &&
      req.body.location.latitude !== undefined &&
      req.body.location.longitude !== undefined
    ) {
      lat = req.body.location.latitude;
      lng = req.body.location.longitude;
    } else if (
      req.body.latitude !== undefined &&
      req.body.longitude !== undefined
    ) {
      lat = req.body.latitude;
      lng = req.body.longitude;
    } else {
      return res.status(400).json({
        error:
          "Provide latitude & longitude (either top-level or inside 'location'). Examples:\n" +
          `{ "latitude": 12.9716, "longitude": 77.5946 } \nor\n` +
          `{ "location": { "latitude": 12.9716, "longitude": 77.5946 } }`,
      });
    }

    // Convert to numbers if they are strings
    const latN = typeof lat === "string" ? parseFloat(lat) : lat;
    const lngN = typeof lng === "string" ? parseFloat(lng) : lng;

    if (Number.isNaN(latN) || Number.isNaN(lngN)) {
      return res
        .status(400)
        .json({ error: "latitude and longitude must be valid numbers" });
    }

    // Check if coordinates are in the wrong order
    if (latN < -180 || latN > 180 || lngN < -90 || lngN > 90) {
      // Swap if they are in the wrong order
      if (latN < -90 || latN > 90) {
        // Assume user entered [lat, lng] instead of [lng, lat]
        [latN, lngN] = [lngN, latN];
      }

      // Check again after potential swap
      if (latN < -180 || latN > 180 || lngN < -90 || lngN > 90) {
        return res.status(400).json({
          error:
            "Invalid coordinates. Please ensure latitude is between -90 and 90 and longitude is between -180 and 180.",
        });
      }
    }

    // Always normalize to GeoJSON format: [longitude, latitude]
    req.normalizedCoords = {
      type: "Point",
      coordinates: [lngN, latN], // GeoJSON expects [lng, lat]
    };

    next();
  } catch (err) {
    console.error("validateLatLng error:", err);
    return res
      .status(500)
      .json({ error: "Server error validating coordinates" });
  }
}
