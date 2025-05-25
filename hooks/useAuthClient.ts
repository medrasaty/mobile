import { AuthClient } from "@/lib/api";
import { Axios } from "axios";

export default function useAuthClient(): Axios {
  return AuthClient()
}
