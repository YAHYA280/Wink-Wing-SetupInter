// axios
import axios from "axios";

// get weekly countings
export const getListingsCount = async (body: {
  type: string;
  neighbourhoods: { id: number }[];
  point: [number, number];
  radius: number;
  geometry: any;
}) => {
  try {
    const { type, neighbourhoods } = body; // Extracting from body

    const startTime = performance.now();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/listings/count`,
      {
        type,
        neighbourhoods,
        point: body.point,
        radius: body.radius,
        geometry: body.geometry,
      }
    );

    const endTime = performance.now(); // End time measurement
    const duration = endTime - startTime; // Calculate duration in milliseconds

    console.log(`API call took ${duration}ms`);

    return res.data.count;
  } catch (e) {
    console.error("Error fetching listings count:", e);
    return 0;
  }
};

// get all listings
export const getAllListings = async (
  page: number,
  rowsPerPage: number,
  token: string
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/listings`,
      { page, rowsPerPage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.result;
  } catch (e) {
    console.error(e);
  }
};
