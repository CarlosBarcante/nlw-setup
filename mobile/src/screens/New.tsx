import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import CheckBox from '../components/CheckBox';

import colors from 'tailwindcss/colors';

const week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

function New() {
    const [weekChecked, setWeekChecked] = useState<number[]>([]);

    function handleToggleWeekChecked(weekIndex: number) {
        if (weekChecked.includes(weekIndex)) {
            setWeekChecked(prevState => prevState.filter(day => day !== weekIndex))
        } else {
            setWeekChecked(prevState => [...prevState, weekIndex])
        }
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <View className='flex-row justify-between'>
                <BackButton />

                <Text className='text-white font-extrabold text-3xl'>Criar Hábito</Text>

                <View className='w-8' />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text className='mt-6 text-white font-semibold text-base'>
                    Qual é o seu comprometimento?
                </Text>

                <TextInput
                    className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600'
                    placeholder='Exercícios, dormir bem, etc...'
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className='mt-6 mb-6 text-white font-semibold text-base'>
                    Qual é a recorrência?
                </Text>

                {
                    week.map((day, i) => {
                        return (
                            <CheckBox
                                key={day}
                                title={day}
                                checked={weekChecked.includes(i)}
                                onPress={() => handleToggleWeekChecked(i)}
                            />
                        )
                    })
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    className='w-full h-14 flex-row items-center justify-center bg-green-600 mt-6 rounded-md'
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />

                    <Text className='font-semibold text-base text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default New;