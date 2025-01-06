import * as z from "zod";

export const discussionSchema = z.object({
  title: z.string().min(1),
});
