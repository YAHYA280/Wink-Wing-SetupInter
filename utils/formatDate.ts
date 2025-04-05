// format date
export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("en-GB", options); // or 'en-US' based on preference
};
