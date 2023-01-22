import { ScrollView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import CheckBox from '../components/CheckBox';

interface HabitParams {
    date: string;
}

function Habit() {
    const route = useRoute();
    const { date } = route.params as HabitParams;

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <View className='flex-row justify-between'>
                <BackButton />

                <Text className='text-white font-extrabold text-3xl'>Hábitos</Text>

                <View className='w-8' />
            </View>

            <Text className='text-zinc-400 font-semibold text-2xl text-center mt-2'>
                {`${dayOfWeek} - ${dayAndMonth}`}
            </Text>

            <ProgressBar progress={80} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className='mt-8'>
                    <CheckBox title='Beber 2l de água' checked={false} />
                    <CheckBox title='Exercícios' checked={true} />
                </View>
            </ScrollView>
        </View>
    )
}

export default Habit;