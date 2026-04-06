import Link from "next/link";

export default function CategoryGrid() {
  const categories = [
    "fashion",
    "beauty",
    "tech",
    "fitness",
    "food",
    "travel",
  ];

  return (
    <div className="grid md:grid-cols-6 gap-4">
      {categories.map((cat, i) => (
        <Link key={i} href={`/brand/category/${cat}`}>
          <div className="p-4 text-center bg-white rounded-xl shadow hover:bg-secondary hover:text-white transition cursor-pointer">
            {cat.toUpperCase()}
          </div>
        </Link>
      ))}
    </div>
  );
}