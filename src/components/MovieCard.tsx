import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ApiList } from "@/types/types";
import noPoster from "@/assets/no-poster.webp";
import { tmdbImage } from "@/lib/tmdb";

interface MovieCardProps {
  movie: ApiList;
  onClick?: () => void;
  className?: string;
}

const MovieCard = ({ movie, onClick, className = "" }: MovieCardProps) => {
  const title = movie.title || movie.name || "";
  const rating = movie.vote_average ?? 0;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-lg shadow-black/30 backdrop-blur-sm transition-shadow hover:shadow-pink-500/20 ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={tmdbImage(movie.poster_path) || noPoster}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = noPoster;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
          <Star className="h-3 w-3 fill-amber-300" />
          {rating.toFixed(1)}
        </div>
        {rating >= 7 && (
          <div className="absolute left-2 top-2 rounded-full bg-brand-gradient px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Hot
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-xl bg-brand-gradient px-3 py-2 text-center text-sm font-bold text-white">
            View Details
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="truncate text-sm font-semibold">{title}</h4>
        {movie.release_date && (
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;
