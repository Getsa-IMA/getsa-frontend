export default function ValueProps() {
  const items = [
    "Vetted Creators",
    "Secure Payments",
    "No Hidden Fees",
    "Fast Hiring",
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          <h3 className="font-semibold">{item}</h3>
          <p className="text-sm opacity-70 mt-2">
            Built for brands to scale influencer marketing easily.
          </p>
        </div>
      ))}
    </section>
  );
}