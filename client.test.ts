import * as Revolt from "./client.ts";

const REVOLT_TOKEN = Deno.env.get("REVOLT_TOKEN");
if (!REVOLT_TOKEN) throw new Error("REVOLT_TOKEN is required");

console.log(REVOLT_TOKEN);

const api = new Revolt.APIClient({
  base: "https://api.revolt.chat",
  headers: {
    "x-bot-token": REVOLT_TOKEN,
    "content-type": "application/json",
  },
});

const config = await api.get("Query Node", "/");
console.log(`The API is running revolt ${config.revolt}`);

const me = await api.get("Fetch Self", "/users/@me");
console.log(`My ID is ${me._id}`);

const channel_id = "01F9RHP3807TPS2E9RVN14YVTC";
await api.post("Send Message", `/channels/${channel_id}/messages`, {
  body: {
    content: "Hello!",
  },
});
