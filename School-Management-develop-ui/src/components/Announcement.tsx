"use client";

const Announcement = () => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl flex justify-center items-center flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold">Announcement</h1>
        <span className="text-xs text-gray-500 cursor-pointer">View All</span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-omkarSkyLight rounded-md p-4 w-full">
          <div className="flex justify-between w-full items-center">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              25-01-01
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            aliquam? Veniam non magni quos!
          </p>
        </div>
        <div className="bg-omkarPurpleLight rounded-md p-4 w-full">
          <div className="flex justify-between w-full items-center">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              25-01-01
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            aliquam? Veniam non magni quos!
          </p>
        </div>
        <div className="bg-omkarYellowLight rounded-md p-4 w-full">
          <div className="flex justify-between w-full items-center">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              25-01-01
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            aliquam? Veniam non magni quos!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
