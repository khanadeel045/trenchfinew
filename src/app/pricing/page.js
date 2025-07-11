// ❌ remove 'use client'
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';

export default async function PricingPage() {
  const user = await requireMembershipAccess('/pricing');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        ❌ Access denied. Upgrade your membership to view this page.
      </div>
    );
  }

  const plans = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/memberships`, {
    cache: 'no-store',
  }).then(res => res.json());

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">🚀 Choose Your TrenchFi Membership</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans
          .filter(plan => plan.isActive)
          .map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{plan.description}</p>

              <div className="text-3xl font-bold text-green-400 mb-6">
                ${plan.price} <span className="text-base text-gray-400">/ month</span>
              </div>

              <ul className="text-sm space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    ✅ <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* optional: move subscribe logic to client component */}
              <form action={`/api/users/subscribe`} method="POST" className="mt-auto">
                <input type="hidden" name="membershipId" value={plan._id} />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          ))}
      </div>
    </div>
  );
}
