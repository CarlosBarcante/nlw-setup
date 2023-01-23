import { useEffect, useState } from 'react';
import api from '../lib/axios';
import dayjs from 'dayjs';

import datesFromYear from '../utils/dates-from-year';
import HabitDay from './HabitDay';


const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

const dates = datesFromYear();

function HabitsTable() {
    const [summary, setSummary] = useState<Summary>([]);

    useEffect(() => {
        api.get('/summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return (
        <div className='w-full flex overflow-x-scroll'>
            <div className='grid grid-rows-7 grid-flow-row gap-3 '>

                {
                    week.map((day, i) => {
                        return (
                            <div
                                key={`${day}-${i}`}
                                className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
                            >
                                {day}
                            </div>
                        )
                    })
                }
            </div>

            <div className='grid grid-rows-7 grid-flow-col gap-3'>
                {
                    summary.length > 0 &&
                    dates.map(date => {
                        const dayInSummary = summary.find(day => {
                            return dayjs(date).isSame(day.date, 'day');
                        })
                        return (
                            <HabitDay
                                key={date.toString()}
                                date={date}
                                amount={dayInSummary?.amount}
                                defaultCompleted={dayInSummary?.completed}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HabitsTable;