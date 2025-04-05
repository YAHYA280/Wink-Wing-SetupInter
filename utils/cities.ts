// axios
import axios from "axios";

export const getCities = async (country: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cities?country=${country}`
    );
    return res.data;
  } catch (e: any) {
    console.error("Error fetching cities:", e.message);
  }
};

export const getNeighborhoods = async (cityId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/cities/neighbourhoods/${cityId}`
    );
    return res.data;
  } catch (e: any) {
    console.error("Error fetching neighborhood", e.message);
  }
};
