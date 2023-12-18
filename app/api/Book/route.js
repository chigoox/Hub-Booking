import { isDev } from "@/app/Support/MyCodes/Util";
import { NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MamPiLPNdUzkCF3xdRvn0nkLpOrsJFo1um4Z7e07FlQXH6T7HCHhRxYkVjkK2iPW61EMZKoDM0ml6YSdWmAPcEn00E3jb1Gcr');



export async function POST(request) {

    const inDev = isDev()

    console.log(inDev)



    const data = await request.json()
    const { price, name, img } = data?.data


    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                unit_amount: price * 100,
                product_data: {
                    name: name,
                    description: 'Your booking deposit fee',
                    images: [img],
                },
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: inDev ? `http://localhost:3000/?successBook=true` : `http://hubbook.vercel.app/?successBook=true`,
        cancel_url: inDev ? `http://localhost:3000/?canceledBook=true` : `http://hubbook.vercel.app/?canceledBook=true`,
    });

    let result = session.url;



    return NextResponse.json({ url: result })



}










