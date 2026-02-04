import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Create Supabase client with service role for bypassing RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      console.error('Missing signature or webhook secret');
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment successful:', session.id);

        const email = session.customer_details?.email;
        const customerId = session.customer as string;

        if (email) {
          // Find user by email
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();

          if (profile) {
            // Determine plan type
            const priceId = session.line_items?.data[0]?.price?.id || '';
            let planType = 'onetime';
            if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY) {
              planType = 'monthly';
            } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL) {
              planType = 'annual';
            }

            // Create or update subscription
            const { error } = await supabase
              .from('subscriptions')
              .upsert({
                user_id: profile.id,
                stripe_customer_id: customerId,
                stripe_price_id: priceId,
                status: session.mode === 'subscription' ? 'active' : 'inactive',
                plan_type: planType,
                current_period_start: session.mode === 'subscription' ? new Date().toISOString() : null,
                current_period_end: session.mode === 'subscription' ? null : null,
              }, {
                onConflict: 'user_id',
              });

            if (error) {
              console.error('Error creating subscription:', error);
            }
          }
        }

        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id);

        const customerId = subscription.customer as string;

        // Find subscription by customer ID and update
        const updateData: any = {
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
        };

        // Add period dates if they exist
        if (subscription.current_period_start) {
          updateData.current_period_start = new Date(subscription.current_period_start * 1000).toISOString();
        }
        if (subscription.current_period_end) {
          updateData.current_period_end = new Date(subscription.current_period_end * 1000).toISOString();
        }

        const { error } = await supabase
          .from('subscriptions')
          .update(updateData)
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Error updating subscription:', error);
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);

        const updateData: any = {
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
        };

        // Add period dates if they exist
        if (subscription.current_period_start) {
          updateData.current_period_start = new Date(subscription.current_period_start * 1000).toISOString();
        }
        if (subscription.current_period_end) {
          updateData.current_period_end = new Date(subscription.current_period_end * 1000).toISOString();
        }

        const { error } = await supabase
          .from('subscriptions')
          .update(updateData)
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error);
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id);

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            cancel_at_period_end: false,
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error canceling subscription:', error);
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed for invoice:', invoice.id);

        // TODO: Send payment failure email to customer

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
