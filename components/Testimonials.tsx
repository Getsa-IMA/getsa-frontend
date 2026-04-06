export default function Testimonials() {
  const data = [
    "Saved us 20+ hours monthly",
    "Best influencer platform",
    "Super easy to use",
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Trusted by Brands
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <p className="italic">"{t}"</p>
            <p className="mt-4 font-semibold">Marketing Head</p>
          </div>
        ))}
      </div>
    </section>
  );
}