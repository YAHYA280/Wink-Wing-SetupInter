// axios
import axios from "axios";

// toggle email notifications
export const toggleEmailNotifications = async (token: string) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/toggle-email-notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// toggle whatsapp notifications
export const toggleWhatsAppNotifications = async (token: string) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/toggle-whatsapp-notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// change whatsapp number
export const changeWhatsAppNumber = async (
  whatsappNumber: string,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/whatsapp-number`,
      {
        whatsappNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
