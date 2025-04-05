// next
import Link from "next/link";

export default function Copyright() {
  return (
    <div className="bg-[#1e1e1e] text-white">
      <div className="flex flex-wrap items-center justify-center gap-3 py-8 px-2">
        <span className="text-white text-[20px]">
          &copy; 2024 - Winkwing B.V.
        </span>
        <span className="text-white text-[20px]">CoC: 63794144</span>
        <span className="text-white text-[20px]">info@winkwing.com</span>
        <Link className="text-white text-[20px]" href="/">
          Privacy
        </Link>
        <Link className="text-white text-[20px]" href="/">
          Terms
        </Link>
        <Link className="text-white text-[20px]" href="/">
          Cookies
        </Link>
        <Link className="text-white text-[20px]" href="/">
          Consent Preferences
        </Link>
      </div>
    </div>
  );
}
