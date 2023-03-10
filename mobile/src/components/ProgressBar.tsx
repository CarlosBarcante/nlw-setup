import { View } from 'react-native';

interface ProgressBarProps {
    progress?: number;
}

function ProgressBar({ progress = 0 }: ProgressBarProps) {
    return (
        <View className='w-full h-3 rounded-lg bg-zinc-700 mt-4 transition-all'>
            <View
                className='h-3 rounded-xl bg-violet-600'
                style={{ width: `${progress}%` }}
            />
        </View>
    )
}

export default ProgressBar;