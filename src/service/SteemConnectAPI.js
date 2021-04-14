import hivesigner from "hivesigner";

const api = new hivesigner.Client({
  app: "loginking",
  baseURL: "https://hivesigner.com",
  callbackURL:
    process.env.REACT_APP_SC_CALLBACK || "https://www.hashkings.app/callback",
  scope: ["custom_json", "login", "logout"],
  accessToken: "sc_token"
});

export default api;
