import { z } from "zod";

const PreferencesSchema = z.object({
  theme: z.string(),
  notifications: z.boolean(),
});

const ReqCreateUserDetailsSchema = z.object({
  place_birth: z.string(),
  date_birth: z.string().optional(),
  gender: z.string(),
  phone_number: z.string(),
  bio: z.string(),
  preferences: PreferencesSchema,
});

const ReqUpdateUserDetailsSchema = ReqCreateUserDetailsSchema.partial();

export type ReqCreateUserDetails = z.infer<typeof ReqCreateUserDetailsSchema>;
export type ReqUpdateUserDetails = z.infer<typeof ReqUpdateUserDetailsSchema>;

export { ReqCreateUserDetailsSchema };
