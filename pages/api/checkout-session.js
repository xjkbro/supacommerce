const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Create Checkout Sessions from body params.
            const params = {
                submit_type: "pay",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                shipping_address_collection: {
                    allowed_countries: ["US", "CA"],
                },
                mode: "payment",
                line_items: req.body,
                automatic_tax: {
                    enabled: true,
                },
                success_url: `${req.headers.origin}/checkout/thank-you?session_id={CHECKOUT_SESSION_ID}&order=completed`,
                cancel_url: `${req.headers.origin}/checkout`,
            };
            const checkoutSession = await stripe.checkout.sessions.create(
                params
            );

            res.status(200).json(checkoutSession);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Internal server error";
            res.status(500).json({ statusCode: 500, message: errorMessage });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
    // res.status(200).json({ msg: "HELLO" });
}
