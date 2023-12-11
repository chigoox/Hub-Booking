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
import { CheckCircle2, ChevronLeft, ChevronRight, MoveLeft } from "lucide-react"
import AvailableHours from "../../Componets/Bookings/AvailableHours"
import TimesBar from '../../Componets/Bookings/TimesBar'
import { AiFillBackward, AiOutlineArrowDown, AiOutlineArrowLeft, AiOutlineArrowUp } from 'react-icons/ai'
import { cn, dayNames } from '@/lib/utils'
import { CheckboxIcon, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { addToDatabase, fetchDocument } from '../../MyCodes/Database'








export const BookSection = ({ openBookItem, setOpenBookItem }) => {
    const [adminDATA, setAdminDATA] = useState({})
    const reservations = adminDATA?.allRes ? adminDATA?.allRes : []


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
        const startHour = set(StartOfToday, { hours: 9 })
        const endHour = set(endOfToday, { hours: 20, minutes: 0 })
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
            const startHour = set(StartOfToday, { hours: 9 })
            const endHour = set(endOfToday, { hours: 20, minutes: 0 })
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

    const total = (100)
    useEffect(() => {
        fetchDocument('Admin', 'reservations', setAdminDATA)

    }, [reload, calendarTouched, selectedDay])


    const bookNow = () => {
        console.log(total)

        fetch('/.netlify/functions/CheckOut', {
            method: 'POST',
            pinkirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                price: total / 2,
                name: myPackage.type
            })
        }).then(res => {
            res.json().then(res => {

                window.location.href = res.url

            })
        })
    }
    return (


        < Modal isOpen={openBookItem} backdrop={'blur'} onOpenChange={() => { setOpenBookItem(false) }
        } placement='auto' scrollBehavior='inside' className={`absolute z-[999] border w-full bg-black`}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-white">{('Explore Feed')}</ModalHeader>
                        <ModalBody className='hidescroll overflow-hidden overflow-y-scroll text-white  p-0 m-auto'>

                        </ModalBody>

                    </>
                )}
            </ModalContent>
        </Modal >
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
