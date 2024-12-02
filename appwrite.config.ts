import * as sdk from "node-appwrite";
export const {
  PROJECT_ID,
  AUTH_API_KEY,
  NEXT_PUBLIC_PRODUCT_IMAGES_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDOINT: ENDPOINT,
} = process.env;

export const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(AUTH_API_KEY!);

export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
