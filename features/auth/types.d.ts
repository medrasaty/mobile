import { BaseUser } from "@/types/user.types";
import { BaseProfile } from "@features/profile/types";


interface AuthUser extends BaseUser {
  profile: BaseProfile

}

export interface AuthSession {
  user: AuthUser;
  token: string;
}