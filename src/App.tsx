import { useCallback, useState } from "react";
import { useOnExpire } from "use-on-expire";
import { format } from "date-fns";
import Timer from "./Timer";

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>();
  const [success, setSuccess] = useState<boolean>(false);
  const minDate = currentTime.toISOString().split(":");

  const { dateToRefresh } = useOnExpire({
    date,
    fn: useCallback(() => setSuccess(true), []),
  });

  return (
    <div
      className={`${
        success ? "bg-purple-300" : "bg-slate-300"
      }	flex flex-col h-screen w-screen items-center justify-center`}
    >
      <div className="rounded bg-slate-200 shadow-lg shadow-gray-400 border-2 p-4	max-w-xl border-slate-100	flex flex-col content-center justify-center min-[1220px]:w-1/2 max-[1000px]:w-full gap-10">
        <Timer currentTime={currentTime} setCurrentTime={setCurrentTime} />
        <div className="flex justify-between">
          <div className="text-xl text-gray-700 ">Fire on: </div>
          <div>
            {(dateToRefresh && format(dateToRefresh, "yyyy-MM-dd HH:mm:ss")) ??
              "Please choose date and wait..."}
          </div>
        </div>
        {/* {timeoutId && !success && (
          <div className="text-3xl text-gree-500">Wait for it...</div>
        )} */}
        <div className="flex justify-between">
          <div className="text-xl text-gray-700">Date:</div>
          <input
            id="dateTime"
            type="datetime-local"
            min={`${minDate[0]}:${minDate[1]}`}
            step="1"
            onChange={({ currentTarget: { value } }) => {
              if (value) {
                const newDate = new Date(value);
                if (newDate.getTime() > new Date().getTime()) {
                  console.log(newDate);
                  setDate(new Date(value));
                  setSuccess(false);
                }
              }
            }}
          />
        </div>

        <div className="flex justify-between">
          <div className="text-xl text-gray-700">Delay:</div>
          <input type="time" step="1" />
        </div>
      </div>
    </div>
  );
}

export default App;
