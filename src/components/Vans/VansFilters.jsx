import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

export default function VansFilters() {
  const { filterOptions } = useSelector((state) => state.vans);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = Array.from(searchParams.values());

  return (
    <div className="flex items-center justify-between mt-4 mb-12">
      <div className="md:space-x-8 space-x-3">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSearchParams((prevSearchParams) => {
                !prevSearchParams.has(`type${option.id}`)
                  ? prevSearchParams.append(
                      `type${option.id}`,
                      option.type.toLowerCase()
                    )
                  : prevSearchParams.delete(`type${option.id}`);
                return prevSearchParams;
              });
            }}
            className={`${
              typeFilter.includes(option.type.toLowerCase())
                ? option.buttonStyle
                : "bg-[#FFEAD0] hover:outline hover:outline-2 hover:outline-[#FFEAD0]"
            } text-[#4D4D4D] md:text-base text-sm md:font-medium font-semibold rounded-md md:py-2 py-1 md:px-6 px-4 transition`}
          >
            {option.type}
          </button>
        ))}
      </div>
      {typeFilter.length > 0 && (
        <>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="hover:outline outline-[#a61414] outline-2 md:py-2 py-1 md:px-6 px-4 rounded-md text-white md:text-base text-sm md:font-medium font-semibold bg-[#a61414] transition sm:block hidden"
          >
            Clear filters
          </button>
          <button
            onClick={() => {
              setSearchParams({});
            }}
            className="hover:outline outline-[#a61414] outline-2 md:p-2 p-1 rounded-full text-white text-base font-medium bg-[#a61414] transition sm:hidden block"
          >
            <FaXmark />
          </button>
        </>
      )}
    </div>
  );
}
