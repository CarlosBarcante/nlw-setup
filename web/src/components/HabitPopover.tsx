import { useEffect, useState } from 'react';
import api from '../lib/axios';

import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

interface HabitPopoverProps {
    date: Date;
    onCompletedChange: (completed: number) => void;
}

type HabitsInfo = {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>;
    completedHabits: string[];
}

function HabitPopover({ date, onCompletedChange }: HabitPopoverProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => {
            setHabitsInfo(response.data);
        })
    }, [])

    async function handleToggleChecked(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`);

        const isChecked = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if (isChecked) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })

        onCompletedChange(completedHabits.length);
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date);

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {
                habitsInfo?.possibleHabits.map(habit => {
                    return (
                        <Checkbox.Root
                            key={habit.id}
                            onCheckedChange={() => handleToggleChecked(habit.id)}
                            disabled={isDateInPast}
                            className='flex items-center gap-3 group'
                            checked={habitsInfo.completedHabits.includes(habit.id)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500'>
                                <Checkbox.Indicator>
                                    <Check
                                        size={20}
                                        className='text-white'
                                    />
                                </Checkbox.Indicator>
                            </div>

                            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                                {habit.title}
                            </span>
                        </Checkbox.Root>
                    )
                })
            }
        </div>
    )
}

export default HabitPopover;