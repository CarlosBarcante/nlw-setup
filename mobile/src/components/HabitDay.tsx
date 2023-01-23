import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';
import dayjs from 'dayjs';

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / 7) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
    amount?: number;
    completed?: number;
    date: Date;
};

function HabitDay({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) {
    const amountCompleted = amount > 0 ? (completed / amount) * 100 : 0;
    const today = dayjs().startOf('day').toDate();
    const currentDay = dayjs(date).isSame(today);
    const isDateInFuture = dayjs(date).startOf('day').isAfter(today);

    return (
        <TouchableOpacity
            className={clsx('bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1', {
                'bg-violet-900 border-violet-800': amountCompleted > 0 && amountCompleted < 20,
                'bg-violet-800 border-violet-700': amountCompleted >= 20 && amountCompleted < 40,
                'bg-violet-700 border-violet-600': amountCompleted >= 40 && amountCompleted < 60,
                'bg-violet-600 border-violet-500': amountCompleted >= 60 && amountCompleted < 80,
                'bg-violet-500 border-violet-400': amountCompleted >= 80 && amountCompleted < 100,
                'bg-violet-400 border-violet-300': amountCompleted == 100,
                'border-white border-4': currentDay,
                'opacity-40': isDateInFuture
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}

export default HabitDay;