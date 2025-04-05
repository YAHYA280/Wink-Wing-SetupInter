export default function WelcomeHero() {
  return (
    <div className="py-24 px-2 min-h-screen flex flex-col-reverse items-center justify-center gap-20 lg:flex-col md:pb-24">
      <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap gap-6">
        <img src="/aftersignup-image.png" alt="Image One" />
        <img src="/aftersignup-image-2.png" alt="Image Two" />
        <img src="/aftersignup-image-3.png" alt="Image Three" />
      </div>
      <div>
        <h1 className="font-bold text-center text-4xl font-arial mb-[80px] text-[#003956] md:text-[48px] leading-[50px]">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[140px] px-2">
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-[24px] leading-[29px] mb-[35px]">
              Searching for a house without Winkwing
            </h3>
            <ul className="flex flex-col items-center justify-start lg:items-start gap-7">
              <li>❌ Spend hours looking on a few websites</li>
              <li>❌ Be too late to apply for the viewing</li>
              <li>❌ Not getting a reaction from the landlord</li>
              <li>❌ Miss listings from lesser known websites</li>
            </ul>
          </div>
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-[24px] leading-[29px] mb-[35px]">
              Searching for a house with Winkwing
            </h3>
            <ul className="flex flex-col items-center justify-start lg:items-start gap-7">
              <li>✅ Receive live notifications from 750 websites</li>
              <li>✅ Be one of the first to apply for the viewing</li>

              <li>✅ Get invited for viewings more regularly</li>

              <li>✅ Find listings on 96% of all rental websites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
