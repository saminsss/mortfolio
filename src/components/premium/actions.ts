"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export const createCheckoutSession = async (priceId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer_email: user.emailAddresses[0].emailAddress,
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `By clicking the button below, you agree to our [Terms of Service](${process.env.NEXT_PUBLIC_BASE_URL}/terms)`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
};
