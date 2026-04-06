export default function HowItWorks() {
  const steps = [
    "Search creators",
    "Hire or create campaign",
    "Receive content",
  ];

  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center font-bold">
              {i + 1}
            </div>
            <p className="mt-4">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}