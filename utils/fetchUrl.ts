export const fetchUrlLogout =
  process.env.NODE_ENV === "production"
    ? "/api/logout"
    : "http://localhost:3000/api/logout";

export const fetchUrlLogin =
  process.env.NODE_ENV === "production"
    ? "/api/login"
    : "http://localhost:3000/api/login";

export const fetchUrlRegister =
  process.env.NODE_ENV === "production"
    ? "/api/register"
    : "http://localhost:3000/api/signup";

export const fetchUrlRecovery =
  process.env.NODE_ENV === "production"
    ? "/api/recovery"
    : "http://localhost:3000/api/recovery";
