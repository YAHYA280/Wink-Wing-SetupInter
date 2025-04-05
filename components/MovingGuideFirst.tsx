export default function MovingGuideFirst() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">
        1. Add Search buddy
      </h1>
      <p className="text-[16px] leading-[24px]">
        Respond faster together! Enter the email address of your partner,
        friend, or brother, and receive notifications about new properties
        together. We only send notifications via email.
      </p>
      <form className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
        <input
          className="border border-[#CED4D9] rounded-lg py-2 px-3"
          type="text"
        />
        <button className="bg-main border border-main rounded-lg py-2 px-10 text-white  font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          Add search buddy
        </button>
      </form>
    </div>
  );
}
