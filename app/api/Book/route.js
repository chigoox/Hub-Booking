import { NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MamPiLPNdUzkCF3xdRvn0nkLpOrsJFo1um4Z7e07FlQXH6T7HCHhRxYkVjkK2iPW61EMZKoDM0ml6YSdWmAPcEn00E3jb1Gcr');



export async function POST(request) {



    const data = await request.json()
    const { price, name } = data?.data


    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                unit_amount: price * 100,
                product_data: {
                    name: name,
                    description: 'Your booking deposit fee',
                    images: ['https://plus.unsplash.com/premium_photo-1681873742740-9a0e9eaa4584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'],
                },
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://indimassage.netlify.app/?successBook=true`,
        cancel_url: `http://indimassage.netlify.app/?canceledBook=true`,
    });

    let result = session.url;



    return NextResponse.json({ url: result })



}










