import { BaseUser } from "@/types/user.types";
import { BaseProfile } from "@features/profile/types";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters long" }),
});

export type loginCredentials = z.infer<typeof loginSchema>;

export interface AuthUser extends BaseUser {
  profile: BaseProfile;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}
