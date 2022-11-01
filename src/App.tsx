import { useCallback, useState } from "react";
import { useOnExpire } from "use-on-expire";
import { format } from "date-fns";
import Confetti from "react-confetti";

import Timer from "./Timer";
import DateInput from "./DateInput";

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [success, setSuccess] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false);
  const [dates, setDate] = useState<Date[]>([]);

  const { dateToRefresh } = useOnExpire({
    date: accept ? dates : undefined,
    fn: useCallback(() => setSuccess(true), []),
  });

  return (
    <div
      className={`${
        success ? "bg-purple-300" : "bg-slate-300"
      }	flex flex-col h-screen w-screen items-center justify-center`}
    >
      {success && (
        <Confetti
          height={window.innerHeight}
          width={window.innerWidth}
          tweenDuration={1000}
        />
      )}

      <div className="rounded bg-slate-200 shadow-lg shadow-gray-400 border-2 p-4	max-w-xl border-slate-100	flex flex-col content-center justify-center min-[1220px]:w-1/2 max-[1000px]:w-full gap-10">
        <Timer
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          dateToRefresh={dateToRefresh}
        />
        <div className="flex justify-between">
          <div className="text-xl text-gray-700 ">Fire on: </div>
          <div>
            {(dateToRefresh && format(dateToRefresh, "yyyy-MM-dd HH:mm:ss")) ??
              "Please choose date and wait..."}
          </div>
        </div>
        <DateInput
          currentDate={currentTime}
          onChange={(newDate) => {
            setDate((currentState) => [...currentState, newDate]);
            setAccept(false);
          }}
        />
        <div className="flex flex-col gap-2 justify-between">
          <button
            onClick={() => {
              if (!accept && dates.length > 0) {
                setSuccess(false);
                setAccept(true);
              }
            }}
            className=" bg-purple-300 h-10"
          >
            Accept
          </button>
          <button
            onClick={() => {
              setDate([]);
              setSuccess(false);
              setAccept(false);
            }}
            className=" bg-purple-300 h-10"
          >
            Reset
          </button>
        </div>

        {/* <div className="flex justify-between">
          <div className="text-xl text-gray-700">Delay:</div>
          <input type="time" step="1" />
        </div> */}
      </div>
    </div>
  );
}

export default App;
