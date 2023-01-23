import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import api from '../lib/axios';
import clsx from 'clsx';

import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import CheckBox from '../components/CheckBox';
import Loading from '../components/Loading';

interface HabitParams {
    date: string;
}

type DayInfo = {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>;
    completedHabits: string[];
}

function Habit() {
    const [loading, setLoading] = useState(true);
    const [dayInfo, setDayInfo] = useState<DayInfo>();
    const [completedHabits, setCompletedHabits] = useState<string[]>([]);

    const route = useRoute();
    const { date } = route.params as HabitParams;

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM');
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date);

    const amountCompleted = dayInfo?.possibleHabits.length
        ? (completedHabits.length / dayInfo.possibleHabits.length) * 100
        : 0;

    async function fetchHabits() {
        try {
            setLoading(true);

            const response = await api.get('day', { params: { date } });
            setDayInfo(response.data);
            setCompletedHabits(response.data.completedHabits);
        } catch (error) {
            console.log(error);
            Alert.alert('Ops', 'Não foi possivel carregar os dados.');
        } finally {
            setLoading(false);
        }
    }

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`);

        if (completedHabits.includes(habitId)) {
            setCompletedHabits(prevState => prevState.filter(id => id !== habitId));
        } else {
            setCompletedHabits([...completedHabits, habitId]);
        }
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

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

            <ProgressBar progress={amountCompleted} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className={clsx('mt-8', {
                    'opacity-50': isDateInPast,
                })}>
                    {
                        dayInfo &&
                        dayInfo?.possibleHabits?.map(habit => {
                            return (
                                <CheckBox
                                    disabled={isDateInPast}
                                    onPress={() => handleToggleHabit(habit.id)}
                                    key={habit.id}
                                    title={habit.title}
                                    checked={completedHabits.includes(habit.id)}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Habit;