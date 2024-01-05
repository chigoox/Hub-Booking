'use client'
import React, { useEffect, useContext } from 'react'
import { useMemo, useState } from "react"
import {
    add,
    addDays,
    addHours,
    eachDayOfInterval,
    eachMinuteOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameMonth,
    isThisMonth,
    isToday,
    parse,
    parseISO,
    set,
    startOfDay,
    startOfToday,
    startOfWeek,
    startOfYesterday
} from "date-fns"
import { ArrowLeftCircle, ArrowRightCircle, CheckCircle2, ChevronLeft, ChevronRight, MoveLeft } from "lucide-react"
import AvailableHours from "../../Componets/Bookings/AvailableHours"
import TimesBar from '../../Componets/Bookings/TimesBar'
import { AiFillBackward, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowUp } from 'react-icons/ai'
import { cn, dayNames } from '@/lib/utils'
import { Button, CheckboxIcon, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { addToDatabase, fetchDocument } from '../../MyCodes/Database'
import Loading from '../Loading'








export const BookSection = ({ openBookItem }) => {
    const [adminDATA, setAdminDATA] = useState({})
    const reservations = adminDATA?.allRes ? adminDATA?.allRes : []

    const [loading, setLoading] = useState(false)

    const total = openBookItem.price

    const [bookingInfo, setBookingInfo] = useState({})
    const [reload, setReload] = useState(false)
    // display div of availables times
    const [calendarTouched, setCalendarTouched] = useState(false)
    // handle dates
    let today = startOfToday()
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
    let [selectedDay, setSelectedDay] = useState(today)
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
    let days = useMemo(
        () =>
            eachDayOfInterval({
                start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
                end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
            }),
        [firstDayCurrentMonth]
    )

    // all days avaiilable times in this month until you change it
    const [availableTimesInThisMonth, setAvailableTimesInThisMonth] = useState([])
    const [
        availableTimesInThisMonthForEachDay,
        setAvailableTimesInThisMonthForEachDay
    ] = useState([])

    // next and prev month functions
    function prevMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }
    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }

    // get available times for the selected day
    const freeTimes = useMemo(() => {
        const StartOfToday = startOfDay(selectedDay)
        const endOfToday = endOfDay(selectedDay)
        // change your working hours here
        const startHour = set(StartOfToday, { hours: 0 })
        const endHour = set(endOfToday, { hours: 23, minutes: 0 })
        let hoursInDay = eachMinuteOfInterval(
            {
                start: startHour,
                end: endHour
            },
            { step: 60 }
        )

        // filter the available hours
        let freeTimes = hoursInDay.filter(
            hour => !reservations.includes(parseISO(hour.toISOString()).toString())
        )

        return freeTimes
    }, [selectedDay])

    // calculate the number of available times for each day in this month
    useMemo(() => {
        let thisMonthTimesLength = []
        let thisMonthTimesEachDay = []
        days.map((day, dayIdx) => {
            // get times

            const StartOfToday = startOfDay(day)
            const endOfToday = endOfDay(day)
            // change your working hours here
            const startHour = set(StartOfToday, { hours: 0 })
            const endHour = set(endOfToday, { hours: 23, minutes: 0 })
            let hoursInDay = eachMinuteOfInterval(
                {
                    start: startHour,
                    end: endHour
                },
                { step: bookingInfo.extraTime == 'No' ? 60 : 90 }
            )
            // filter the available hours
            let freeTimes = hoursInDay.filter(
                hour => !reservations.includes(parseISO(hour.toISOString()).toString())
            )
            thisMonthTimesLength.push(freeTimes.length)
            thisMonthTimesEachDay.push(freeTimes)
        })

        setAvailableTimesInThisMonth(thisMonthTimesLength)
        setAvailableTimesInThisMonthForEachDay(thisMonthTimesEachDay)
    }, [currentMonth])
    const bookingOptions = [
        'Yes',
        'No', //



    ]


    useEffect(() => {
        fetchDocument('Admin', 'reservations', setAdminDATA)

    }, [reload, calendarTouched, selectedDay])


    const bookNow = async () => {
        setLoading(true)
        try {
            const payment = await fetch("/api/Book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        //
                        price: total,
                        name: String(openBookItem?.name),
                        img: openBookItem?.img
                    }
                }),
            })

            const paymentConfirm = await payment.json().then(res => {
                window.location.href = res.url
            })

            return { payment: { ...paymentConfirm } }
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }


    }



    return (
        <div className='h-auto m-auto'>
            {loading && <Loading />}
            <div className={`${bookingInfo.extraTime ? 'opacity-100' : 'opacity-100 z-0'} trans flex flex-col  md:flex-row   md:items-start  lg:justify-center mb-10 md:mb-24`}>


                {/* calendar implementation */}
                <div className="flex flex-col gap-2 h-[450px] w-[380px] md:h-fit md:w-fit m-auto ">
                    {/* calendar header */}
                    <div className="grid grid-cols-3 md:w-[40rem] px-8">
                        <button
                            type="button"
                            onClick={prevMonth}
                            disabled={isThisMonth(new Date(currentMonth))}
                        >
                            <ArrowLeftCircle
                                size={20}
                                aria-hidden="true"
                                color='black'
                                className={cn('top-2 relative',
                                    isThisMonth(new Date(currentMonth)) && "text-pink-400"
                                )}
                            />
                        </button>
                        <h2 className="font-semibold text-black justify-center flex text-center">
                            {format(firstDayCurrentMonth, " MMMM yyyy")}
                        </h2>
                        <button
                            type="button"
                            className="flex justify-end top-2 relative"
                            onClick={nextMonth}
                        >
                            <ArrowRightCircle size={20} aria-hidden="true" color='black' />
                        </button>
                    </div>

                    {/* calendar body */}
                    <div className='p-2'>
                        <div className="grid grid-cols-7 mt-4 md:w-[40rem]">
                            {dayNames.map((day, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex justify-center items-center text-sm text-black w-full py-2",
                                            {
                                                "text-red-700 font-bold":
                                                    day === "Sun" || day === "Sat"
                                            }
                                        )}
                                    >
                                        {day}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="grid grid-cols-7 text-sm gap-2 md:w-[40rem]">
                            {days.map((day, dayIdx) => {
                                return (
                                    <div
                                        key={day.toString()}
                                        className={cn(
                                            dayIdx === 0 && colStartClasses[getDay(day) - 1],
                                            " justify-center flex items-center",
                                            (getDay(day) === 0 || getDay(day) === 6) &&
                                            "style for sat and sun bg"
                                        )}
                                    >
                                        <button
                                            onClick={() => {
                                                setCalendarTouched(true)
                                                setSelectedDay(day)
                                            }}
                                            className={cn(
                                                "w-12 h-12 md:h-24 md:w-24 flex flex-col  p-2 justify-center items-center rounded-xl gap-0 group bg-gray-900 relative group",
                                                isEqual(day, selectedDay) &&
                                                "bg-blue-800 text-white  text-lg",



                                                isEqual(today, day) && "text-white bg-sky-700",
                                                isBefore(day, today) && "cursor-not-allowed bg-gray-700 text-red-900",
                                                isEqual(day, selectedDay) &&
                                                isToday(day) &&
                                                "bg-blue-600",
                                                !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                !isSameMonth(day, firstDayCurrentMonth) &&
                                                "text-blue-400",
                                                !isEqual(day, selectedDay) &&
                                                !isToday(day) &&
                                                isSameMonth(day, firstDayCurrentMonth) &&
                                                "text-white"
                                            )}
                                            disabled={isBefore(day, today)}
                                        >
                                            {isAfter(day, startOfYesterday()) && (
                                                <span className="hidden group-hover:flex absolute top-0 -translate-x-.5 -translate-y-4 z-10 text-[11px] bg-slate-900 text-slate-100 px-1 rounded-md gap-1">
                                                    <span>{availableTimesInThisMonth[dayIdx]}</span>
                                                    <span>Available</span>
                                                </span>
                                            )}

                                            <time
                                                dateTime={format(day, "yyyy-MM-dd")}
                                                className={cn(
                                                    "group-hover:text-lg trans ",
                                                    (isEqual(day, selectedDay) || isToday(day)) &&
                                                    "font-semibold"
                                                )}
                                            >
                                                {format(day, "d")}
                                            </time>

                                            <CheckCircle2
                                                className={cn(
                                                    "hidden",
                                                    isEqual(day, selectedDay) &&
                                                    "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-white",
                                                    isEqual(day, today) && "text-white"
                                                )}
                                            />

                                            {isAfter(day, startOfYesterday()) && (
                                                <TimesBar
                                                    times={availableTimesInThisMonthForEachDay[dayIdx]}
                                                />
                                            )}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className={cn(`hidden mx-auto fadeInZoom`, calendarTouched && "block")}>
                    <span className="flex items-center w-full justify-center gap-1">
                        <span className='bg-black-800 p-2'>
                            <h1 className='text-center text-white'>Select reservation time for</h1>
                            <h1 className="text-center text-white font-semibold pl-1">
                                {format(selectedDay, "dd MMMM yyyy").toString()}
                            </h1>
                        </span>
                    </span>

                    <AvailableHours freeTimes={freeTimes} setBookingInfo={setBookingInfo} reload={reload} setReload={setReload} />
                </div>
            </div>


            {bookingInfo.apointment && <div className=' mb-96  center flex-col text-white p-2'>
                <h1 className='text-xl text-center'>{`Your reservation is on ${bookingInfo.apointment}`}</h1>
                <h1 className='text-center text-pink-700'>depoit half to comfirm booking</h1>
                <div className='center gap-1'>
                    <h1 className='text-center text-pink-700 text-5xl'>{'$' + total}</h1>
                    <h1>+ Tax</h1>
                </div>
                <button onClick={bookNow} className='h-12 w-32 bg-pink-700'>Book Now</button>
            </div>}
        </div>
    )
}

let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7"
]
