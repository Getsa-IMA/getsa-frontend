export default function CreatorCard({ creator }: any) {
  if (!creator) return null;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl hover:scale-105 transition overflow-hidden">

      {/* IMAGE */}
      <img
        src={`${creator.image}?w=400`}
        alt={creator.name}
        className="h-48 w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="font-semibold text-lg">{creator.name}</p>

        <p className="text-sm opacity-70">
          {creator.niche.toUpperCase()} • {creator.followers}
        </p>

        <p className="text-sm text-gray-500">
          📍 {creator.location} • {creator.platform}
        </p>

        <p className="text-secondary font-bold mt-2">
          {creator.price}
        </p>

        <button className="w-full mt-3 bg-secondary text-white py-2 rounded-lg text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}