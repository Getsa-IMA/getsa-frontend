"use client";

export default function SearchBar() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl grid md:grid-cols-4 gap-3">

      <input
        className="p-3 border rounded-lg"
        placeholder="Search creators (e.g. fashion, tech)"
      />

      <select className="p-3 border rounded-lg">
        <option>Platform</option>
        <option>Instagram</option>
        <option>YouTube</option>
        <option>UGC</option>
        <option>Other</option>
      </select>

      <select className="p-3 border rounded-lg">
        <option>Category</option>
        <option>Fashion</option>
        <option>Beauty</option>
        <option>Tech</option>
        <option>Fitness</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Other</option>
      </select>

      <button className="bg-secondary text-white rounded-lg px-4 py-3 font-semibold hover:scale-105 transition">
        Search
      </button>

    </div>
  );
}