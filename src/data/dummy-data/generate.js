// import {
//     randBetweenDate,
//     randNumber,
//     randProduct,
//     randProductAdjective,
// } from "@ngneat/falso";
// // import { LoremIpsum } from "lorem-ipsum";

// import { createClient } from "@supabase/supabase-js";

// // Create a single supabase client for interacting with your database
// const supabase = createClient(
//     "https://anyzlthrxmlnduuesdhk.supabase.co",
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );
// // const lorem = new LoremIpsum({
// //     sentencesPerParagraph: {
// //         max: 8,
// //         min: 4,
// //     },
// //     wordsPerSentence: {
// //         max: 16,
// //         min: 4,
// //     },
// // });
// const createSlug = (title) => {
//     return title
//         .toLowerCase()
//         .replace(/ /g, "-")
//         .replace(/[^\w-]+/g, "");
// };

// // function generateRandomRating() {
// //     var min = 0,
// //         max = 5,
// //         highlightedNumber = Math.random() * (max - min) + min;
// //     return parseFloat(highlightedNumber.toFixed(1));
// // }

// const main = async () => {
//     try {
//         //no delete many
//         // await supabase.from("cat").deleteMany();
//         // await supabase.from("prod").deleteMany();
//         // await primsa.category.deleteMany();
//         // await primsa.product.deleteMany();
//         const fakeProducts = randProduct({
//             length: 10,
//         });
//         for (let index = 0; index < fakeProducts.length; index++) {
//             const product = fakeProducts[index];
//             const productAdjective = randProductAdjective();

//             let prod = await supabase
//                 .from("prod")
//                 .insert({
//                     title: `${productAdjective} ${product.title}`,
//                     slug: createSlug(`${productAdjective} ${product.title}`),
//                     description: product.description,
//                     price: product.price,
//                     image: `${product.image}/tech`,
//                     quantity: 0,
//                 })
//                 .select();
//             let cat = await supabase
//                 .from("cat")
//                 .insert({
//                     name: product.category,
//                 })
//                 .select();
//             let relation = await supabase.from("prod_to_cat").insert({
//                 product_id: prod.data.id,
//                 category_id: cat.data.id,
//             });
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// main();
