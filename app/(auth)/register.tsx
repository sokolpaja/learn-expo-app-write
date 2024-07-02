import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { registerUser } from '@/lib/appwrite';
import { RegisterUserPayload } from '@/types';
import { useGlobalContext } from '@/contexts/GlobalProvider';

const RegisterScreen = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState<RegisterUserPayload>({
    email: 'sokol.paja@inova.al',
    password: 'Test@1234',
    username: 'kolpaja',
  });

  const { setUser, setIsLogged } = useGlobalContext();

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmit(true);

    try {
      const result = await registerUser({
        ...form,
      });
      setUser(result);
      setIsLogged(true);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmit(false);
      setForm({
        email: '',
        password: '',
        username: '',
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-1 justify-center items-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-28 h-9"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white font-semibold mt-10">
            Register in to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) =>
              setForm((prev) => ({
                ...prev,
                username: text.trim().toLowerCase(),
              }))
            }
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text.trim().toLowerCase() }))
            }
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="your_email@mail.com"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text.trim() }))
            }
            otherStyles="mt-7"
          />

          <CustomButton
            title="Register"
            containerStyles="w-full mt-7"
            handlePress={handleRegister}
            isLoading={isSubmit}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link
              href={'/login'}
              className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
