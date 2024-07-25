import eventsource from "react-native-sse";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedPocketBase } from "@/pocketbase-types";

declare namespace global {
  var EventSource: typeof eventsource;
}

global.EventSource = eventsource;

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
  initial: AsyncStorage.getItem("pb_auth"),
  clear: async () => AsyncStorage.removeItem("pb_auth"),
});

export const pb = new PocketBase(
  process.env.EXPO_PUBLIC_PB_URL,
  store
) as TypedPocketBase;
