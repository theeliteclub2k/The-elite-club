import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "../../../../../prisma/prisma";

export async function POST(req: Request) {
  const secret = process.env.SIGNING_SECRET;

  if (!secret) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error(error);
    return new Response("Error: verification of webhook failed", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const type = evt.type;

  if (type === "user.created") {
    try {
      const {
        email_addresses,
        primary_email_address_id,
        first_name,
        last_name,
      } = evt.data;

      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );

      if (!primaryEmail) {
        return new Response("Error: No primary email address found", {
          status: 400,
        });
      }

      //create user in db

      const user = await prisma.user.create({
        data: {
          id: evt.data.id,
          email: primaryEmail.email_address,
          name: `${first_name} ${last_name}`,
        },
      });

      console.log("new user created in db: ", user);
    } catch (error) {
      console.error(error);
      return new Response("Error: failed to create user in db", {
        status: 400,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
