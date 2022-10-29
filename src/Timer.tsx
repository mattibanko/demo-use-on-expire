import { format } from "date-fns";
import { Dispatch, useCallback, useEffect } from "react";

interface Props {
  currentTime: Date;
  setCurrentTime: Dispatch<Date>;
}

export default function Timer({ currentTime, setCurrentTime }: Props) {
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
    <div className="flex justify-between">
      <div className="text-xl text-gray-700">Current time:</div>
      <div className="text-xl text-gray-700">
        {format(currentTime, "yyyy-MM-dd HH:mm:ss")}
      </div>
    </div>
  );
}
