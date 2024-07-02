import {
  View,
  Text,
  KeyboardType,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';

type Props = {
  title: string;
  otherStyles?: string;
  handleChangeText: (text: string) => void;
  keyboardType?: KeyboardType;
  value?: string;
  placeholder?: string;
};

const FormField: React.FC<Props> = ({
  handleChangeText,
  keyboardType,
  title,
  otherStyles,
  value,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 w-full  ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 items-center pr-2 border-black-200 w-full h-16 rounded-2xl flex-row focus:border-secondary">
        <TextInput
          className="flex-1 text-white font-psemibold text-base px-2"
          onChangeText={handleChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
