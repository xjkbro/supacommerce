export default async function handler(req, res) {
    console.log(req.query.slug);
    const slug = req.query.slug.substring(0, req.query.slug.indexOf("."));

    if (req.method === "GET") {
        res.redirect(307, "/products/" + slug);
    }
}
