import { useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';

import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import HabitPopover from './HabitPopover';

interface HabitDayProps {
    date: Date,
    defaultCompleted?: number,
    amount?: number
}

function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted);

    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

    const dayOfWeek = dayjs(date).format('dddd');
    const dayAndMonth = dayjs(date).format('DD/MM');
    const today = dayjs().startOf('day').toDate();
    const currentDay = dayjs(date).isSame(today);
    const isDateInFuture = dayjs(date).startOf('day').isAfter(today);

    function handleCompletedChanged(completed: number) {
        setCompleted(completed);
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors', {
                    'bg-violet-900 border-violet-800': completedPercentage > 0 && completedPercentage < 20,
                    'bg-violet-800 border-violet-700': completedPercentage >= 20 && completedPercentage < 40,
                    'bg-violet-700 border-violet-600': completedPercentage >= 40 && completedPercentage < 60,
                    'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
                    'bg-violet-500 border-violet-400': completedPercentage >= 80 && completedPercentage < 100,
                    'bg-violet-400 border-violet-300': completedPercentage == 100,
                    'border-white border-4': currentDay,
                    'opacity-40 cursor-not-allowed': isDateInFuture
                })}
            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <Popover.Arrow width={24} height={16} className='fill-zinc-900' />

                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitPopover date={date} onCompletedChange={handleCompletedChanged} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default HabitDay;