// axios
import axios from "axios";

export const getTranslations = async (locale: string) => {
  try {
    const res = await axios.get(
      `http://localhost:1337/api/home-page?populate=*&locale=${locale}`
    );

    return res.data || {};
  } catch (e: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching translations:", e.message);
    }

    return null;
  }
};
