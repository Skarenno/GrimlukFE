import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp) return true;

    console.log("now: " + Date.now())
    const expMs = exp > 1e12 ? exp : exp * 1000; // handle both seconds & ms
    console.log("exp: " + expMs)

    if(Date.now() >= expMs)
      console.log("EXPIRED")
    return Date.now() >= expMs;
  } catch {
    return true; // invalid token = treat as expired
  }
};
