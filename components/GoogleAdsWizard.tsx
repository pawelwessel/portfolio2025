"use client";
import { useState } from "react";
import { FaUserPlus, FaShoppingCart, FaChartLine } from "react-icons/fa";

type WizardProps = {
  onClose: () => void;
};

export default function GoogleAdsWizard({ onClose }: WizardProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    websiteUrl: "",
    businessName: "",
    goal: "leads",
    monthlyBudget: "1500",
    email: "",
    phone: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function startStripeCheckout() {
    try {
      setSubmitting(true);
      const budgetNumber = Number(form.monthlyBudget || 0);
      const res = await fetch("/stripe/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          // Use budget as price input for demo purposes (PLN)
          totalPricePLN: isFinite(budgetNumber) ? Math.max(0, budgetNumber) : 0,
          successRedirect: `${process.env.NEXT_PUBLIC_URL ?? ""}/success`,
          meta: {
            websiteUrl: form.websiteUrl,
            businessName: form.businessName,
            goal: form.goal,
            phone: form.phone,
          },
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
    }
  }

  return (
    <div
      onClick={onClose}
      className="font-sans fixed inset-0 z-[2100] bg-black/60 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
      >
        <div className="relative">
          <div className="absolute -inset-x-1 -top-1 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-zinc-900 text-xl sm:text-2xl font-bold">
              Konfiguracja kampanii Google Ads
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-700 rounded-lg px-3 py-1"
              aria-label="Zamknij"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <div
                className={`h-2 flex-1 rounded-full ${
                  step >= 0 ? "bg-emerald-500" : "bg-zinc-200"
                }`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${
                  step >= 1 ? "bg-emerald-500" : "bg-zinc-200"
                }`}
              />
              <div
                className={`h-2 flex-1 rounded-full ${
                  step >= 2 ? "bg-emerald-500" : "bg-zinc-200"
                }`}
              />
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1">
                  Adres strony WWW
                </label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(e) =>
                    setForm({ ...form, websiteUrl: e.target.value })
                  }
                  placeholder="https://twoja-domena.pl"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1">
                  Nazwa firmy / marki
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                  placeholder="Nazwa firmy"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-3">
                  Cel kampanii
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setForm({ ...form, goal: "leads" })}
                    className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                      form.goal === "leads"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50"
                    } transition-colors`}
                  >
                    <FaUserPlus className="w-6 h-6 mb-2 text-emerald-600" />
                    <span className="text-sm font-medium">
                      Pozyskiwanie leadów
                    </span>
                  </button>
                  <button
                    onClick={() => setForm({ ...form, goal: "sales" })}
                    className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                      form.goal === "sales"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50"
                    } transition-colors`}
                  >
                    <FaShoppingCart className="w-6 h-6 mb-2 text-emerald-600" />
                    <span className="text-sm font-medium">Sprzedaż</span>
                  </button>
                  <button
                    onClick={() => setForm({ ...form, goal: "traffic" })}
                    className={`text-black flex flex-col items-center justify-center p-4 rounded-lg border ${
                      form.goal === "traffic"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50"
                    } transition-colors`}
                  >
                    <FaChartLine className="w-6 h-6 mb-2 text-emerald-600" />
                    <span className="text-sm font-medium">Ruch na stronę</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="mt-6 block text-sm font-medium text-zinc-800 mb-1">
                  Miesięczny budżet (PLN)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={form.monthlyBudget}
                  onChange={(e) =>
                    setForm({ ...form, monthlyBudget: e.target.value })
                  }
                  placeholder="1500"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1">
                  Email kontaktowy
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="twoj@email.com"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1">
                  Telefon (opcjonalnie)
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+48 123 456 789"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
                />
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="font-semibold mb-1">Podsumowanie</div>
                <div>Strona: {form.websiteUrl || "—"}</div>
                <div>Firma: {form.businessName || "—"}</div>
                <div>Cel: {form.goal}</div>
                <div>Budżet: {form.monthlyBudget || 0} PLN/mies.</div>
                <div>Email: {form.email || "—"}</div>
                <div>Telefon: {form.phone || "—"}</div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
            <div className="flex gap-3">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Wstecz
              </button>
              {step < 2 && (
                <button
                  onClick={next}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-semibold"
                >
                  Dalej
                </button>
              )}
            </div>
            {step === 2 && (
              <button
                onClick={startStripeCheckout}
                disabled={submitting || !form.email}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Przekierowuję do Stripe…" : "Podsumowanie"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
