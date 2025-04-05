// next
import Link from "next/link";
import Image from "next/image";

export default function RentalHero({ bg }: { bg: string }) {
  return (
    <div className={`bg-[${bg}] py-24 relative z-20`}>
      <div className="flex flex-col items-center justify-center gap-[60px] lg:flex-row lg:justify-between px-2 max-w-[1164px] mx-auto">
        <Image
          src="/rentalhero.png"
          alt="Hero Image"
          width={1920}
          height={1080}
          layout="responsive"
          loading="lazy"
          priority={false}
        />

        <div className="flex flex-col items-center justify-center text-center gap-7 lg:min-w-[600px]">
          {/* title */}
          <div>
            <h1 className="font-extrabold text-center text-4xl  text-[#003956] md:text-[50px] md:leading-[60px]">
              Find your next rental home.
            </h1>

            <h1 className="flex items-center justify-center font-extrabold  text-4xl md:text-[60px] md:leading-[70px] text-[#0485C6]">
              Let
              <Image
                className="w-[200px] mx-3 mt-2"
                src="/winkwing-logo.svg"
                alt="Logo"
                width={200}
                height={41}
                loading="lazy"
              />
              help.
            </h1>
          </div>

          {/* text */}
          <p className="text-[16px] leading-[24px] max-w-[520px]">
            Moving is stressful. WinkWing helps you by searching for apartments,
            scanning 750+ websites every minute. The only thing you still have
            to do is respond to all your matches.
          </p>
          {/* button */}
          <Link
            href="/how-it-works"
            className="bg-main text-white border border-main text-[20px] py-2 px-[50px] font-semibold  xl:hover:bg-transparent xl:hover:text-main rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover all benefits
          </Link>

          {/* reviews */}
          {/* <div className="flex flex-wrap justify-center items-center gap-5">
            <h1 className="text-[20px] font-semibold text-[#2c2c2c]">
              Excelent
            </h1>
            <img src="/hero-review.svg" alt="Hero Review" />
            <h3 className="font-medium text-lg text-[#2C2C2C]">
              1,215 Reviews on
            </h3>
            <img src="/hero-trustpilot.svg" alt="TrustPilot" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
