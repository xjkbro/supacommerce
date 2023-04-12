const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    console.log(req.body);

    if (req.method === "POST") {
        try {
            // Create Checkout Sessions from body params.
            // const session = await stripe.checkout.sessions.retrieve(req.body);

            const session = await stripe.checkout.sessions.retrieve(
                "cs_test_a1mukkLkFMmLicZcYdnTKdLDz2DwFfObUWdWRh3yRtJXyte9kkvXQuRjQH"
            );

            const lineItems = await stripe.checkout.sessions.listLineItems(
                "cs_test_a1mukkLkFMmLicZcYdnTKdLDz2DwFfObUWdWRh3yRtJXyte9kkvXQuRjQH",
                { limit: 50 }
            );

            // ========================
            // Create order logic headers
            // ========================

            res.status(200).json({ session, lineItems });
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
