import { throwServerError } from "../helpers/error-transformer";
import http from "../helpers/http";

/** Register new user */
export async function signUpService(
  payload: Record<"username" | "password" | "role", string>
) {
  try {
    return await http.post("/auth/signup", payload);
  } catch (error) {
    throwServerError(error);
  }
}

/** Login to account */
export async function signInService(
  payload: Record<"username" | "password", string>
) {
  try {
    return await http.post("/auth/signin", payload);
  } catch (error) {
    // return error;
    throwServerError(error);
  }
}
