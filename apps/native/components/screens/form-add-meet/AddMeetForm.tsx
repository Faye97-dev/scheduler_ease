import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS, QUERY_MEETINGS_LIST } from "@/constants";
import { Button } from "../../ui/Button";
import { useQueryClient } from "@tanstack/react-query";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useGenericMutation } from "@/hooks/useApi";
import { useRouter } from "expo-router";
import ParticipantsItems from "./ParticipantsItems";
import * as z from "zod";
import { IUserInfo } from "@/lib/session";
// import { zodResolver } from "@hookform/resolvers/zod";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const addMeetchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});
type AddMeetFormValues = z.infer<typeof addMeetchema>;

export default function AddMeetForm({
  session,
}: {
  session: IUserInfo | null;
}) {
  const [participants, setParticipants] = React.useState<string[]>([]);
  // const defaultValues: Partial<addNewMeetFormSchema> = {}
  // const form = useForm<AddMeetFormValues>({
  //   resolver: zodResolver(addMeetchema),
  //   defaultValues,
  //   mode: "onChange",
  // })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useGenericMutation<
    AddMeetFormValues & { participants: string[] },
    unknown
  >();

  function onSubmit(formValues: any) {
    const payload = {
      title: formValues.title,
      participants: participants,
      endDate: formValues.endDate,
      startDate: formValues.startDate,
      description: formValues.description,
    };

    mutate(
      {
        body: payload,
        method: "POST",
        url: "/meetings",
        token: session?.token || "",
      },
      {
        onSuccess: () => {
          reset();
          router.replace("/home");
          Alert.alert("Success !");
          queryClient.invalidateQueries({
            queryKey: [QUERY_MEETINGS_LIST],
          });
        },
      }
    );
  }

  const onChangeParticipantText = (
    value: string,
    onChange: (val: string) => void
  ) => {
    if (value && value.at(-1) == " ") {
      const textToEval = value.slice(0, -1);
      if (isValidEmail(textToEval)) {
        setParticipants([...participants, value]);
        onChange("");
      } else {
        Alert.alert("Invalid email");
      }
    } else onChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Controller
        name="title"
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
      {/*  */}
      <Text style={styles.label}>Start date</Text>
      <Controller
        name="startDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            mode="datetime"
            display="default"
            value={value || new Date()}
            onChange={(_, value) => onChange(value)}
            style={{ width: 175 }}
          />
        )}
        rules={{ required: true }}
      />
      <Text style={styles.label}>End date</Text>
      <Controller
        name="endDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            mode="datetime"
            display="default"
            value={value || new Date()}
            onChange={(_, value) => onChange(value)}
            style={{ width: 175 }}
          />
        )}
        rules={{ required: true }}
      />
      {/*  */}
      <Text style={styles.label}>Recipients</Text>
      {!!participants.length && (
        <ParticipantsItems
          items={participants}
          onPress={(email: string) => {
            setParticipants(participants.filter((item) => item !== email));
          }}
        />
      )}
      <Controller
        control={control}
        name="participant"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            autoCorrect={false}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => onChangeParticipantText(value, onChange)}
          />
        )}
      />
      {/*  */}
      <Text style={styles.label}>Note</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            multiline={true}
            style={styles.textarea}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        {isPending ? (
          <ActivityIndicator size="large" color={COLORS["yinmn-blue"]} />
        ) : (
          <Button
            text="Add meeting"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || !participants.length}
          ></Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 15,
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    gap: 14,
    padding: 10,
    paddingTop: 30,
    justifyContent: "center",
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "white",
  },
  textarea: {
    height: 100,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "white",
  },
});
