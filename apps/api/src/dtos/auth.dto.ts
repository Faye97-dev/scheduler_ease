import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
export type RegisterUserDto = z.infer<typeof registerUserSchema>;
