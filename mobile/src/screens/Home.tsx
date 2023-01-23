import { useState, useCallback } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../lib/axios';

import datesFromYear from '../utils/dates-from-year';

import Header from '../components/Header';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Loading from '../components/Loading';
import dayjs from 'dayjs';


const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dates = datesFromYear();

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

function Home() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<Summary>([])
    const { navigate } = useNavigation();

    async function fetchData() {
        try {
            setLoading(true);
            const res = await api.get('/summary');
            setSummary(res.data);
        } catch (error) {
            Alert.alert('Ops', 'Não foi possivel carregar os dados da aplicação.');
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []));

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <Header />

            <View className='flex-row mt-6 mb-2'>
                {
                    week.map((day, i) => {
                        return (
                            <Text
                                key={`${week}-${i}`}
                                className='text-zinc-400 text-xl font-bold text-center mx-1'
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                            >
                                {week[i]}
                            </Text>
                        )
                    })
                }
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className='flex-row flex-wrap'>
                    {
                        dates.map((date, i) => {
                            const dayHabits = summary.find(day => {
                                return dayjs(date).isSame(day.date, 'day');
                            })

                            return (
                                <HabitDay
                                    key={date.toISOString()}
                                    date={date}
                                    amount={dayHabits?.amount}
                                    completed={dayHabits?.completed}
                                    onPress={() => navigate('habit', { date: date.toISOString() })}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Home;