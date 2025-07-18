'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MembershipTab() {
  const [me, setMe] = useState(null);
  const [plans, setPlans] = useState([]);
  const [subscribingId, setSubscribingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const userRes = await fetch('/api/me');
      const meData = await userRes.json();
      setMe(meData);

      const plans = await fetch('/api/admin/memberships').then(r => r.json());
      setPlans(plans.filter(p => p.isActive));
    }
    load();
  }, []);

  if (!me) return <p>Loading membership info...</p>;

  const currentPlan = me.membership;
  const remainingDays = me.membershipExpiresAt
    ? Math.ceil((new Date(me.membershipExpiresAt) - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const isTrialActive = currentPlan?.hasFreeTrial && currentPlan?.freeTrialDays && remainingDays <= currentPlan.freeTrialDays;

  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-6">💎 My Membership</h2>

      <div className="mb-10 bg-gray-100 p-5 rounded-lg">
        {currentPlan ? (
          <>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold  text-black">{currentPlan.name}</p>
              {isTrialActive && (
                <span className="bg-yellow-400 text-xs  text-black font-bold px-2 py-1 rounded-full">
                  Free Trial Active
                </span>
              )}
            </div>
            <p className="text-sm text-black">{currentPlan.description}</p>
            <p className="mt-2 text-sm  text-black">
              <strong>Expires:</strong>{' '}
              {new Date(me.membershipExpiresAt).toLocaleDateString()}
            </p>
            {remainingDays > 0 && (
              <p className="text-xs  text-black">⏳ {remainingDays} day(s) remaining</p>
            )}
          </>
        ) : (
          <p className="text-yellow-600 text-white">No active membership yet.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-4 text-white">Upgrade or Switch Plan</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {plans
          .filter(p => p._id !== currentPlan?._id)
          .map(plan => (
            <div key={plan._id} className="bg-gray-200 p-4 rounded-lg  text-black">
              <h4 className="text-lg font-bold flex items-center gap-2 ">
                {plan.name}
                {plan.hasFreeTrial && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {plan.freeTrialDays} Day Free Trial
                  </span>
                )}
              </h4>
              <p className="text-sm text-gray-700">{plan.description}</p>
              <ul className="list-disc ml-6 text-sm my-2 text-gray-600">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">
                  ${plan.price}/{plan.durationUnit}
                </span>
                <button
                  onClick={() => handleSubscribe(plan._id)}
                  disabled={subscribingId === plan._id}
                  className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-500"
                >
                  {subscribingId === plan._id ? 'Processing...' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  async function handleSubscribe(membershipId) {
    setSubscribingId(membershipId);
    const res = await fetch('/api/users/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ membershipId }),
    });

    if (res.ok) {
      alert('✅ Membership updated!');
      router.refresh();
    } else {
      alert('❌ Failed to subscribe.');
    }
    setSubscribingId(null);
  }
}
