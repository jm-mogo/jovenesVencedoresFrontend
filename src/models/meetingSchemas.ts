import { z } from "zod";

export const meetingCreateSchema = z.object({
  date: z.string().date(),
  seasonId: z.number().optional(),
});

export type MeetingCreateValues = z.infer<typeof meetingCreateSchema>;
