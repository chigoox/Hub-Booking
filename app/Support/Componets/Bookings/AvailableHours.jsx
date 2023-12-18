import { addHours, format, isSameMinute, startOfDay, startOfToday } from "date-fns"
import React, { memo, useContext, useState } from "react"
import { CheckboxIcon } from "@nextui-org/react"
import { cn } from "@/lib/utils"
import { addToDatabase } from "../../MyCodes/Database"

// eslint-disable-next-line react/display-name
const AvailableHours = memo(({ freeTimes, setBookingInfo, setReload, reload }) => {
    const [selectedTime, setSelectedTime] = useState()

    const bookTime = () => {
        const fullDate = format(selectedTime, "MM-dd-yy hh:mm aaaaa'm'")
        const date = format(selectedTime, "MM-dd-yy")
        const time12 = format(selectedTime, "HH:mm")
        const time24 = format(selectedTime, "hh:mm")

        const conTime = (time12) => {
            return (parseFloat(`${time12.substring(0, 2)}.${time12.substring(3, 4) == '3' ? '5' : '0'}`))
        }


        setBookingInfo(old => {
            const data = { ...old, apointment: fullDate, date: date, time12: time12, time24: time24, dateMain: addHours(startOfDay(selectedTime), conTime(time12)).toString() }
            if ('user.uid') addToDatabase('Users', 'user.uid', 'willBook', data)
            if ('user.uid') addToDatabase('Admin', 'onHold', 'user.uid', addHours(startOfDay(selectedTime), conTime(time12)).toString())
            return ({ ...old, apointment: fullDate, date: date, time12: time12 })
        })

        setTimeout(() => {
            setReload(!reload)
        }, 300);

    }

    return (
        <div className="flex text-white flex-col items-center w-96 md:w-auto gap-2 mt-4 border-y  h-[30rem]">
            <span>
                Available times:{" "}
                <span className="font-semibold ">
                    {freeTimes.length}
                </span>
            </span>
            <div className="grid lg:grid-cols-3 grid-cols-4 md:grid-cols-2    text-md gap-4 md:h-[35rem] hidescroll p-4 overflow-y-scroll">
                {freeTimes.map((hour, hourIdx) => (
                    <div key={hourIdx}>
                        <button
                            type="button"
                            className={cn(
                                "bg-gray-800 trans-slow  rounded-lg px-2 m-auto text-white relative hover:border hover:border-gray-900 w-[64px] h-[64px]",
                                selectedTime &&
                                isSameMinute(selectedTime, hour) &&
                                "bg-blue-900 text-white font-bold"
                            )}
                            onClick={() => { setSelectedTime(hour); setReload(!reload) }}
                        >
                            <CheckboxIcon
                                color="white"
                                className={cn(
                                    "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-white",
                                    selectedTime && isSameMinute(selectedTime, hour) && "block"
                                )}
                            />
                            {format(hour, "HH:mm")}
                        </button>
                    </div>
                ))}
            </div>
            {selectedTime && (
                <div className="w-full py-6">
                    <h1 className="text-center">reservation time is: </h1>
                    <h1 className="font-semibold text-white pl-1 text-center">
                        {format(selectedTime, "MM-dd-yy hh:mm aaaaa'm'")}
                    </h1>
                    <div className="center w-full">
                        <button onClick={bookTime} className="h-12 w-full bg-[#28587b]">Select time</button>
                    </div>
                </div>
            )}
        </div>
    )
})

export default AvailableHours