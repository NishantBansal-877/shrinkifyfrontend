const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Compress up to 5 images/day", "Basic compression", "Standard support"],
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: ["Compress up to 100 images/day", "Advanced compression", "Priority email support", "No ads"],
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: ["Unlimited images", "Custom compression settings", "Dedicated support", "SLA & uptime guarantees"],
  },
];

export default function Pricing() {
  return (
    <div class="subscription-container">
      <div class="subscription-box" role="main">
        <section class="left-section" aria-labelledby="upgrade-heading">
          <h1 id="upgrade-heading">Upgrade to Plus</h1>
          <p>Do more with unlimited blocks, files, automations & integrations.</p>
          <form>
            <label for="account-name">Billed To</label>
            <input id="account-name" name="accountName" type="text" placeholder="Account Name" required />

            <label>Payment Method</label>
            <div class="payment-options" role="group" aria-label="Select payment method">
              <button type="button" class="active" aria-pressed="true">
                💳 Credit Card
              </button>
              <button type="button" aria-pressed="false">
                🏦 Bank Transfer
              </button>
              <button type="button" aria-pressed="false">
                ✨ Cosmic Points
              </button>
            </div>

            <label for="card-number">Card Number</label>
            <input id="card-number" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" />

            <div class="card-details">
              <div>
                <label for="expiry">Expiry (MM/YY)</label>
                <input id="expiry" name="expiry" type="text" placeholder="MM/YY" />
              </div>
              <div>
                <label for="cvv">CVV</label>
                <input id="cvv" name="cvv" type="text" placeholder="CVV" />
              </div>
            </div>

            <label for="country">Country</label>
            <input id="country" name="country" type="text" placeholder="Country" />

            <label for="postal-code">Postal Code</label>
            <input id="postal-code" name="postalCode" type="text" placeholder="Postal Code" />

            <div class="form-actions">
              <button type="button" class="cancel-btn">
                Cancel
              </button>
              <button type="submit" class="subscribe-btn">
                Subscribe
              </button>
            </div>

            <p class="terms">
              By providing your card information, you allow us to charge your card for future payments in accordance with their terms.
            </p>
          </form>
        </section>

        <aside class="right-section" aria-label="Subscription plan details and illustration">
          <div class="plan-box">
            <h3>Starter Plan</h3>
            <label class="radio-option selected">
              <input type="radio" name="plan" checked />
              Pay Monthly <span>$20 / Month / Member</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="plan" />
              Pay Annual{" "}
              <span>
                $16 / Month / Member <strong>Save 15%</strong>
              </span>
            </label>
            <div class="total">
              <p>Total</p>
              <h2>$16 / Month</h2>
            </div>
            <p class="secure-note">🔒 Guaranteed safe & secure, all transactions protected with the highest security level.</p>
          </div>

          <img src="/subscription-illustration.jpg" alt="Plan Illustration" />
        </aside>
      </div>
    </div>
  );
}
