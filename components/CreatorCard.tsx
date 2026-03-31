import React from 'react';

interface CreatorCardProps {
  name: string;
  niche: string;
  price: number;
  image: string;
}

const CreatorCard = ({ name, niche, price, image }: CreatorCardProps) => {
  return (
    <div className="group cursor-pointer rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2 border border-foreground/5 relative flex flex-col">
      <div className="relative h-80 w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        {/* Aesthetic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-sm border border-white/50">
          Top Creator
        </div>
      </div>
      <div className="p-8 relative flex-1 bg-white">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-secondary transition-colors duration-300">{name}</h3>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black text-xl">${price}</span>
        </div>
        <p className="text-foreground/60 text-base mb-6 line-clamp-1 font-medium">{niche}</p>
        <div className="flex items-center gap-3 text-xs font-bold text-foreground/40 mt-auto">
          <span className="hover:text-primary transition-colors py-1 px-3 rounded-full bg-neutral">Instagram</span>
          <span className="hover:text-secondary transition-colors py-1 px-3 rounded-full bg-neutral">TikTok</span>
        </div>
      </div>
    </div>
  );
}
export default CreatorCard;