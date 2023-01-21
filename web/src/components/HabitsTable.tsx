import datesFromYear from '../utils/dates-from-year';
import HabitDay from './HabitDay';

const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const dates = datesFromYear();

console.log(dates);

function HabitsTable() {
    return (
        <div className='flex mx-auto'>
            <div className='grid grid-rows-7 grid-flow-row gap-3'>

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
                    return <HabitDay key={date.toString()} />
                })}
            </div>
        </div>
    )
}

export default HabitsTable;