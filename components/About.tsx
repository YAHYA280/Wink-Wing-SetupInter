// next
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center gap-[80px] bg-[#FFF7F5] py-24 px-2 md:px-20 lg:flex-row">
      <Image src="/about.jpg" alt="About" width={316} height={560} />

      <div className="flex flex-col text-center lg:text-left gap-6">
        <h5 className="text-main text-lg leading-[24px]">
          Why we started Winkwing.
        </h5>
        <h1 className="text-[40px] leading-[40px] font-arial font-extrabold max-w-[540px]">
          By 2 tenants,
          <br /> for tenants
        </h1>
        <p className="text-[16px] leading-[24px] max-w-[540px]">
          As home seekers ourselves, we know how incredibly hard it was to find
          a place to live.Just like you, we spent hours scrolling through
          websites, checking every hour, and still found ourselves often calling
          agents only to hear, "Sorry, this place has already been rented out."
          We both had jobs, but this definitely felt like a full-time job in
          itself.
          <br />
          <br /> We decided to build a tool that would help us monitor all the
          sites we were checking and send us an email as soon as a new place was
          listed. Being the first to know about new places, we were able to
          respond quickly. After attending a handful of viewings, we were in
          luck and found our new home!
          <br />
          <br />
          Friends and family quickly started trying our tool, and we realized
          that we could help many more people. Now, two years later, we have
          helped thousands of people find their new homes, and hopefully, we can
          help you too!
        </p>
      </div>
    </div>
  );
}
