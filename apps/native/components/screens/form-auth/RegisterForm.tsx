import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "@/constants";
import { Button } from "../../ui/Button";
import { Link, useRouter } from "expo-router";
import { useGenericMutation } from "@/hooks/useApi";
import { IUserInfo } from "@/lib/session";

type RegisterFormValues = {
  email: string;
  fullName: string;
  password: string;
};

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm();

  const router = useRouter();

  const { mutate, isPending } = useGenericMutation<
    RegisterFormValues & { participants: string[] },
    { payload: IUserInfo }
  >();

  function onSubmit(formValues: any) {
    mutate(
      {
        body: formValues,
        method: "POST",
        url: "/auth/register",
      },
      {
        onSuccess: async () => {
          reset();
          Alert.alert("User created !");
          router.replace("/login");
        },
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full name</Text>
      <Controller
        name="fullName"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => onChange(value)}
          />
        )}
        name="email"
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        }}
      />
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
        rules={{ required: true, minLength: 6 }}
      />
      <View style={styles.buttonContainer}>
        {isPending ? (
          <ActivityIndicator size="large" color={COLORS["yinmn-blue"]} />
        ) : (
          <>
            <Button
              text="Sign-in"
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            ></Button>
            <Link style={{ fontSize: 16 }} href="/login">
              or sign-up
            </Link>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: COLORS["dark"],
  },
  buttonContainer: {
    flex: 1,
    gap: 12,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    paddingTop: 30,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "white",
  },
});
