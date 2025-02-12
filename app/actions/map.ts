"use server";

export const getMap = async (address: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch map");
    }
    const data = await res.json();
    return { success: true, data: { lon: data[0].lon, lat: data[0].lat } };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch map" };
  }
};
