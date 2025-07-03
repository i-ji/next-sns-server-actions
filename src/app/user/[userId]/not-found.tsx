import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default async function NotFound() {
  return (
    <div className="max-w-[640px] mx-auto">
      <header className="fixed left-3 right-3 top-0 sm:left-[calc((100vw-640px)/2)] sm:right-[calc((100vw-640px)/2)] bg-white sm:pt-10">
        <div className="flex items-center text-2xl sm:text-3xl leading-[30px] border-b-1 border-gray-100 pb-[62px] sm:pb-[60px] pt-[11px] sm:pt-2 px-3 sm:px-6">
          <Link href={"/"} className="mr-auto">
            <IoMdArrowRoundBack />
          </Link>
        </div>
      </header>

      <div className="mt-[300px] text-center text-2xl sm:text-3xl font-bold">
        User Not Found
      </div>
    </div>
  );
}
