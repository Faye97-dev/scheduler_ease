import { z } from "zod";

export const createMeetingSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  participants: z.array(z.string()),
});

export type CreateMeetingDto = z.infer<typeof createMeetingSchema>;
