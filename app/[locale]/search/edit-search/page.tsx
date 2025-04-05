"use client";
// types
import SignUpLocation from "@/components/SignUpLocation";
import SignUpRequirements from "@/components/SignUpRequirements";
import SignUpDetails from "@/components/SignUpDetails";

export default function EditSearch() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-[120px] px-2 bg-[#FFF7F5]">
      <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative to-zinc-100">
        <h5 className="text-[16px] leading-[24px] text-main">
          Find your new home the easy way
        </h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
          Edit your search
        </h1>
        <p className="text-[16px] leading-[24px] max-w-[730px]">
          Tailor your search to your unique preferences—location, budget, and
          features—to receive quality notifications based on your needs.
        </p>
      </div>

      {/*   <div className="text-center bg-white p-5 text-[16px] w-full sm:w-[630px] md:w-[730px] rounded-lg shadow">
        🏠 With this search you can expect {" "}
        <span className="text-main">87 matches</span> per week.
      </div> */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full sm:w-[630px] md:w-[730px] shadow">
        <SignUpLocation />
        <SignUpRequirements />
        <SignUpDetails />

        <button className="bg-main border border-main py-2 px-8 rounded-lg text-white font-semibold text-[16px] w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          Save
        </button>
      </div>
    </div>
  );
}
