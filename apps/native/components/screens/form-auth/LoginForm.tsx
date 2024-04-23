import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "@/constants";
import { Button } from "../../ui/Button";
import { Link, useRouter } from "expo-router";
import { useGenericMutation } from "@/hooks/useApi";
import { IUserInfo, secureStoreSave } from "@/lib/session";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm();

  const router = useRouter();

  const { mutate, isPending } = useGenericMutation<
    LoginFormValues & { participants: string[] },
    { payload: IUserInfo }
  >();

  function onSubmit(formValues: any) {
    mutate(
      {
        body: formValues,
        method: "POST",
        url: "/auth/login",
      },
      {
        onSuccess: async (res) => {
          await secureStoreSave("session", JSON.stringify(res.payload));
          reset();
          router.replace("/home");
        },
      }
    );
  }

  return (
    <View style={styles.container}>
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
            value={value}
            onBlur={onBlur}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(value) => onChange(value)}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <View style={styles.buttonContainer}>
        {isPending ? (
          <ActivityIndicator size="large" color={COLORS["yinmn-blue"]} />
        ) : (
          <>
            <Button
              text="Login"
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            ></Button>
            <Link style={{ fontSize: 16 }} href="/register">
              or sign-in
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
