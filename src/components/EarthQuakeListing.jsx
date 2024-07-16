import { EventCard } from "./EventCard";

export const EarthQuakeListing = () => {
  return (
    <>
      <div className="h-full w-full flex flex-row">
        <div className="h-screen w-screen justify-start px-4 shadow-sm">
          <EventCard />
        </div>
        {/* <div className="h-100 w-full justify-center bg-slate-300 mt-10 p-5">
          <p>loading map...</p>
        </div> */}
      </div>
    </>
  );
};
