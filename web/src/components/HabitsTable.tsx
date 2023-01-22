import datesFromYear from '../utils/dates-from-year';
import HabitDay from './HabitDay';

const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const dates = datesFromYear();

function HabitsTable() {
    return (
        <div className='w-full flex overflow-x-scroll'>
            <div className='grid grid-rows-7 grid-flow-row gap-3 '>

                {week.map((day, i) => {
                    return (
                        <div
                            key={`${day}-${i}`}
                            className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
                        >
                            {day}
                        </div>
                    )
                })}
            </div>

            <div className='grid grid-rows-7 grid-flow-col gap-3'>
                {dates.map(date => {
                    return <HabitDay amount={5} completed={3} key={date.toString()} />
                })}
            </div>
        </div>
    )
}

export default HabitsTable;