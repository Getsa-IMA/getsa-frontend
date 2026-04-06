import { creators } from "@/app/lib/data";
import CreatorCard from "@/components/CreatorCard";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const filteredCreators = creators.filter(
    (c) => c.niche === slug
  );

  return (
    <main className="bg-neutral text-foreground min-h-screen px-6 py-16">

      {/* BACK */}
      <Link href="/brand" className="text-secondary mb-6 inline-block">
        ← Back to Marketplace
      </Link>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold capitalize">
          {slug} Influencers
        </h1>

        <p className="opacity-70 mt-2 max-w-2xl">
          Discover top {slug} creators across India. Filter by platform,
          audience size, and pricing to find the perfect match for your brand.
        </p>
      </div>

      {/* STATS BAR */}
      <div className="flex gap-6 mb-10 text-sm opacity-80">
        <p>🔥 {filteredCreators.length}+ Creators</p>
        <p>💰 Avg Price: ₹5K–₹15K</p>
        <p>📈 High Engagement</p>
      </div>

      {/* GRID */}
      {filteredCreators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredCreators.map((creator: { id: any; }) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-20 text-center bg-white p-10 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Want better results?
        </h2>

        <p className="mb-6 opacity-70">
          Post a campaign and let creators apply to you.
        </p>

        <button className="bg-secondary text-white px-6 py-3 rounded-xl">
          Post Campaign
        </button>
      </div>

    </main>
  );
}



// import { creators } from "@/app/lib/data";
// import CreatorCard from "@/components/CreatorCard";
//    import Link from "next/link";

// export default function CategoryPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;

//   // filter creators based on category
//   const filteredCreators = creators.filter(
//     (c) => c.niche === slug
//   );

//   return (
//     <main className="bg-neutral text-foreground min-h-screen px-6 py-16">

//       {/* Heading */}
//       <h1 className="text-4xl font-bold mb-8 capitalize">
//         {slug} Creators
//       </h1>

//       {/* If no creators */}
//       {filteredCreators.length === 0 ? (
//         <p className="text-gray-500">
//           No creators found for this category.
//         </p>
//       ) : (
//         <><div className="grid md:grid-cols-4 gap-6">
//                       {filteredCreators.map((creator: { id: any; }) => (
//                           <CreatorCard key={creator.id} creator={creator} />
//                       ))}
//                   </div><div>
//                           <Link href="/brand" className="text-sm text-secondary mb-4 inline-block">
//                               ← Back
//                           </Link>
//                       </div></>
     


//       )}
//     </main>
//   );
// }