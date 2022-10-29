import { useCallback, useEffect, useState } from "react";
import { useOnExpire } from "use-on-expire";
import { format } from "date-fns";

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>();
  const [success, setSuccess] = useState<boolean>(false);

  const timer = useCallback(
    (): NodeJS.Timeout =>
      setTimeout(() => {
        setCurrentTime(new Date());
        return timer();
      }, 1000),
    []
  );

  const { timeoutId, dateToRefresh } = useOnExpire({
    date,
    fn: useCallback(() => setSuccess(true), []),
  });
  const minDate = currentTime.toISOString().split(":");

  useEffect(() => {
    const timeout = timer();

    return () => clearTimeout(timeout);
  }, [timeoutId, success, timer]);

  return (
    <div className="bg-slate-300	flex flex-col h-screen w-screen items-center justify-center">
      <div className="rounded bg-slate-200 shadow-lg shadow-gray-400 border-2 p-4	border-slate-100	 flex flex-col content-center justify-center min-[1220px]:w-1/2 max-[1000px]:w-full gap-10">
        <div className="text-xl text-gray-700">
          Current time: {format(currentTime, "yyyy-MM-dd hh:mm:ss")}
        </div>
        <div className="text-xl text-gray-700">
          Fire on:{" "}
          {(dateToRefresh && format(dateToRefresh, "yyyy-MM-dd hh:mm:ss")) ??
            "Please choose date and wait..."}
        </div>
        {timeoutId && !success && (
          <div className="text-3xl text-gree-500">Wait for it...</div>
        )}
        {success && (
          <div className="text-3xl text-pink-500">
            Congratulations, your function has been fired!
          </div>
        )}
        <input
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
    </div>
  );
}

export default App;
