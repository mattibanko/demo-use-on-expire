import { format } from "date-fns";
import { Dispatch, useCallback, useEffect } from "react";

interface Props {
  currentTime: Date;
  setCurrentTime: Dispatch<Date>;
  dateToRefresh?: Date;
}

export default function Timer({
  currentTime,
  setCurrentTime,
  dateToRefresh,
}: Props) {
  const timeToRefresh =
    (dateToRefresh?.getTime() ?? 0) - currentTime?.getTime();

  const timer = useCallback(
    (): NodeJS.Timeout =>
      setTimeout(() => {
        setCurrentTime(new Date());
        return timer();
      }, 1000),
    []
  );

  useEffect(() => {
    const timeout = timer();

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl text-gray-700">Current time:</div>
        <div className="text-xl text-gray-700">
          {format(currentTime, "yyyy-MM-dd HH:mm:ss")}
        </div>
      </div>

      {dateToRefresh && timeToRefresh > 0 && (
        <div className="flex justify-between">
          <div className="text-xl text-gray-700">Timer:</div>
          <div className="text-xl text-gray-700">
            {Math.round(timeToRefresh / 1000)}
          </div>
        </div>
      )}
    </>
  );
}
