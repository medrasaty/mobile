import { BaseUser } from "@/types/user.types";

export interface BlackListUser extends BaseUser {
  // blacklisted date
  created: Date;
}
