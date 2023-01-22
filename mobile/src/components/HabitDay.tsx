import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native';

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / 7) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {

};

function HabitDay({ ...rest }: HabitDayProps) {
    return (
        <TouchableOpacity
            className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}

export default HabitDay;