import { Text, View, ScrollView } from 'react-native';

import datesFromYear from '../utils/dates-from-year';

import Header from '../components/Header';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';

const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dates = datesFromYear();

function Home() {
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

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View className='flex-row flex-wrap'>
                    {
                        dates.map((day, i) => {
                            return (
                                <HabitDay key={day.toISOString()} />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Home;