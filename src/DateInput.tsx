import React from "react";

interface Props {
  currentDate: Date;
  onChange: (value: Date) => void;
}
export default function DateInput({ currentDate, onChange }: Props) {
  const minDate = currentDate.toISOString().split(":");

  return (
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
              onChange(newDate);
            }
          }
        }}
      />
    </div>
  );
}
