import { z } from "zod";

export const teamMembershipSchema = z.object({
  teamId: z.number().or(z.string().regex(/\d+/).transform(Number)),
});

export type TeamMembershipValues = z.infer<typeof teamMembershipSchema>;
