"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMovingGuideData } from "@/services/translationService";

// context
import { usePopup } from "@/context/popupContext";

// components
import Popup from "./Popup";

// phone input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// react switch button
import Switch from "react-switch";

// utils
import {
  changeWhatsAppNumber,
  toggleWhatsAppNotifications,
  toggleEmailNotifications,
} from "@/utils/notifications";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getMe } from "@/store/features/authSlice";

export default function MovingGuideSecond() {
  const { data: translations } = useMovingGuideData();
  const { showPopup, hidePopup } = usePopup();

  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [whatsappNumber, setWhatsappNumber] = useState<string>(
    user?.whatsappNumber ?? ""
  );

  useEffect(() => {
    dispatch(getMe({ token } as { token: string }));
  }, []);

  const handleToggleWhatsappNotifications = async () => {
    try {
      await toggleWhatsAppNotifications(token!);
      await dispatch(getMe({ token } as { token: string }));
    } catch (e) {
      console.error("Error toggling wa notification: ", e);
    }
  };

  const handleToggleEmailNotifications = async () => {
    try {
      await toggleEmailNotifications(token!);
      await dispatch(getMe({ token } as { token: string }));
    } catch (e) {
      console.error("Error toggling email notification ", e);
    }
  };

  const handleChangeWhatsAppNumber = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changeWhatsAppNumber(`+${whatsappNumber}`, token!);
      await dispatch(getMe({ token } as { token: string }));
      hidePopup();
    } catch (e) {
      console.error("Error changing WhatsApp number: ", e);
    }
  };

  // Update local state when user data changes
  useEffect(() => {
    if (user?.whatsappNumber) {
      setWhatsappNumber(user.whatsappNumber);
    }
  }, [user?.whatsappNumber]);

  // Get translations with fallbacks
  const title =
    translations?.ActivateWhatsAppNotifications?.title ||
    "2. Activate WhatsApp notifications";
  const text =
    translations?.ActivateWhatsAppNotifications?.text ||
    "Speed is crucial in the housing market. Receive updates about new properties directly via WhatsApp, allowing you to respond quicker and easily forward listings.";
  const waNotificationsTitle =
    translations?.ActivateWhatsAppNotifications?.wa_notifications_title ||
    "Whatsapp notifications";
  const waNotificationsText =
    translations?.ActivateWhatsAppNotifications?.wa_notifications_text ||
    "Receive notifications on WhatsApp";
  const waNotificationBtn =
    translations?.ActivateWhatsAppNotifications?.wa_notification_btn || "Edit";
  const emailNotificationsTitle =
    translations?.ActivateWhatsAppNotifications?.email_notifications_title ||
    "Email notifications";
  const emailNotificationsText =
    translations?.ActivateWhatsAppNotifications?.email_notifications_text ||
    "Receive notifications in your mailbox.";
  const dialogText =  
    translations?.ActivateWhatsAppNotifications?.Dialog_Text || "Enter your number to activate WhatsApp notifications.";
  const dialogUderInput = 
    translations?.ActivateWhatsAppNotifications?.Dialog_UnderInput || "Select the correct country code";
  const dialogButton =
    translations?.ActivateWhatsAppNotifications?.Dialog_Button || "Save phone number";
  const noActiveNumber = 
  translations?.ActivateWhatsAppNotifications?.noActiveNum || "No active number";

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-between gap-16 mt-8">
        {/* whatsapp notifications */}
        <div className="flex items-center justify-between gap-8">
          <Image
            src="/dashboard-wa-icon.svg"
            alt="WhatsApp Icon"
            width={40}
            height={30}
          />
          <div>
            <h3 className="font-extrabold text-[16px] leading-[24px]">
              {waNotificationsTitle}
            </h3>
            <p className="text-[16px] leading-[24px]">{waNotificationsText}</p>
            <div className="flex items-center gap-2 font-bold text-[16px] leading-[24px]">
              <span>
                {user?.whatsappNumber
                  ? user?.whatsappNumber
                  : `${noActiveNumber}`}
              </span>
              <button
                onClick={(e) => {
                  showPopup();
                  e.stopPropagation();
                }}
                className="text-main xl:hover:underline"
              >
                {waNotificationBtn}
              </button>
            </div>
          </div>
          <div>
            <Switch
              checked={user?.whatsappNotifications ?? false}
              onChange={handleToggleWhatsappNotifications}
              onColor="#307BFF"
              onHandleColor="#FFF"
              handleDiameter={15}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={25}
              width={48}
            />
          </div>
        </div>

        {/* gmail notifications */}
        <div className="flex items-center justify-between gap-8">
          <Image
            src="/dashboard-gmail-icon.svg"
            alt="Email Icon"
            width={40}
            height={30}
          />
          <div>
            <h3 className="font-bold text-[16px] leading-[24px]">
              {emailNotificationsTitle}
            </h3>
            <p className="text-[16px] leading-[24px]">
              {emailNotificationsText}
            </p>
            <span className="font-bold text-[16px] leading-[24px]">
              {user?.email}
            </span>
          </div>
          <div>
            <Switch
              checked={user?.emailNotifications ?? false}
              onChange={handleToggleEmailNotifications}
              onColor="#307BFF"
              onHandleColor="#FFF"
              handleDiameter={15}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={25}
              width={48}
            />
          </div>
        </div>

        {/* popup for editing whatsapp number */}
        <Popup>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col sm:flex-row sm:gap-5 items-center gap-3">
              <Image
                src="/dashboard-wa-icon.svg"
                alt="WA Icon"
                width={40}
                height={30}
              />
              <h1 className="font-bold text-[24px] leading-[24px]">
                {waNotificationsTitle}
              </h1>
            </div>
            <p>{dialogText}</p>
            <form
              onSubmit={handleChangeWhatsAppNumber}
              className="flex flex-col gap-3"
            >
              <PhoneInput
                country={"nl"}
                placeholder="Choose Phone Country"
                value={whatsappNumber}
                onChange={(value) => setWhatsappNumber(value)}
                dropdownStyle={{
                  background: "#F8F9FA",
                  border: "1px solid #CED4D9",
                  borderRadius: "8px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "13px",
                  paddingRight: "13px",
                }}
              />
              <button className="flex items-start mb-3">
               {dialogUderInput}
              </button>
              <button
                className="bg-main border border-main rounded-lg py-3 px-12 sm:px-[140px] text-white font-semibold text-[14px] xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
                type="submit"
              >
                {dialogButton}
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
}
