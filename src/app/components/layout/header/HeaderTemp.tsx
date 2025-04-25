import { ReactNode } from "react";

interface HeaderTempType {
  topHeaderElement: ReactNode;
  bottomHeaderElement: ReactNode;
}

const HeaderTemp = ({
  topHeaderElement,
  bottomHeaderElement,
}: HeaderTempType) => {
  return (
    <header className="fixed left-0 right-0 top-0 sm:left-[calc((100vw-640px)/2)] sm:right-[calc((100vw-640px)/2)] bg-white pt-0 sm:pt-10 z-10">
      <div className="flex justify-between items-center text-2xl sm:text-3xl leading-[30px] px-6 py-2">
        {topHeaderElement}
      </div>

      <div className="flex items-center justify-between font-bold text-lg sm:text-xl cursor-pointer border-b-1 border-gray-100">
        {bottomHeaderElement}
      </div>
    </header>
  );
};

export default HeaderTemp;
