import { Collapsible } from '@/components/Collapsible';
import { HelloWave } from '@/components/HelloWave';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="bg-red-400 dark:bg-white w-full p-4 h-36 flex-1 justify-center items-start">
      <Text className="text-3xl w-full font-pblack text-center py-4  bg-green-200 ">
        Selam <HelloWave />
      </Text>

      <Collapsible title="Collapsible Text">
        <Text>this is a Collapsible text</Text>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
