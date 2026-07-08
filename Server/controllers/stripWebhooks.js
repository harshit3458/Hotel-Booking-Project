import stripe from "stripe"
import Booking from "../models/Booking.js";

export const stripeWebhooks=async (req,res)=>{
  const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
  const sig=req.headers['stripe-signature'];
  let event;

  try {
    event=stripeInstance.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    res.json(400).send(`Webhook Error:${error.message}`)
    
  }

  if(event.type==="payment.intent.succeeded"){
    const paymentIntent=event.data.object;
    const paymentIntentId=paymentIntent.id;

    
    const session=event.data.object;
    const {bookingId}=session.metadata;

    // mark payment as paid

    await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"Stripe"})
  }else{
    console.log("Unhandled event type:",event.type)
  }

  res.json({received:true})
}