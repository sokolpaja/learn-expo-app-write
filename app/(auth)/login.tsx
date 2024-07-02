import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, login } from '@/lib/appwrite';
import { useGlobalContext } from '@/contexts/GlobalProvider';

const LoginScreen = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: 'sokol.paja@inova.al',
    password: 'Test@1234',
  });

  const { setUser, setIsLogged } = useGlobalContext();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Fill in the fields');
    }

    setIsSubmit(true);

    try {
      await login(form.email.toLowerCase(), form.password);
      const result = await getCurrentUser();
      console.log('🚀 ~ handleLogin ~ result:', result);
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
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
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
            title="Login"
            containerStyles="w-full mt-7"
            handlePress={handleLogin}
            isLoading={isSubmit}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Don't have an account?
            </Text>
            <Link
              href={'/register'}
              className="text-lg font-psemibold text-secondary">
              Register
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
