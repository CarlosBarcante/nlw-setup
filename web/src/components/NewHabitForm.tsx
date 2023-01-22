import { FormEvent, useState } from 'react';
import api from '../lib/axios';

import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';

const week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

function NewHabitForm() {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();

        if (!title || weekDays.length === 0) {
            return;
        }

        await api.post('habits', {
            title,
            weekDays,
        })

        setTitle('');
        setWeekDays([])

        alert('Hábito criado com sucesso!');
    }

    function handleToggleWeekDay(day: number) {
        if (weekDays.includes(day)) {
            const newDays = weekDays.filter(weekDay => weekDay !== day);
            setWeekDays(newDays);
        } else {
            const newDays = [...weekDays, day];
            setWeekDays(newDays);
        }
    }

    return (
        <form onSubmit={createNewHabit} className='w-full flex flex-col mt-6'>
            <label
                htmlFor='title'
                className='font-semibold leading-tight'
            >
                Qual seu comprometimento?
            </label>

            <input
                type='text'
                id='title'
                placeholder='Exercícios, dormir bem, etc...'
                className='mt-4 p-4 roudend-lg bg-zinc-800 text-white placeholder:text-zinc-400'
                autoFocus
                value={title}
                onChange={event => {
                    setTitle(event.target.value);
                }}
            >
            </input>

            <label
                htmlFor=''
                className='font-semibold leading-tight mt-4'
            >
                Qual a recorrência?
            </label>

            <div className='mt-4 flex flex-col gap-2'>
                {
                    week.map((day, i) => {
                        return (
                            <Checkbox.Root
                                key={day}
                                className='flex items-center gap-3 group'
                                checked={weekDays.includes(i)}
                                onCheckedChange={() => handleToggleWeekDay(i)}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500'>
                                    <Checkbox.Indicator>
                                        <Check
                                            size={20}
                                            className='text-white'
                                        />
                                    </Checkbox.Indicator>
                                </div>

                                <span className=' text-white leading-tight'>
                                    {day}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }
            </div>

            <button
                type='submit'
                className='mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-600 hover:bg-green-500'
            >
                <Check size={20} weight='bold' />
                Confirmar
            </button>
        </form>
    )
}

export default NewHabitForm;