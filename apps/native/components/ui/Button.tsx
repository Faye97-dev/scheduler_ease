import { COLORS } from "@/constants";
import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button({
  text,
  onPress,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={style ? style : disabled ? styles.buttonDisabled : styles.button}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#2f80ed",
  },
  buttonDisabled: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#2f80ed",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
