import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styled from './styles.module.scss';

interface SubscribeButtonProps {
  priceId?: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }    

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }
    
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch(err) {
      alert(err.message);
    }

    // criação da checkout session
  }

  return (
    <button
      type="button"
      className={styled.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
