import { memo } from "react";
import Link from "next/link";
import { ChevronRight, Star, Tag, Clock } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProblemCardProps {
  problem: {
    _id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topic: string;
    solved?: boolean;
  };
}

const difficultyColors = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export default memo(function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={`/problems/${problem._id}`}>
      <div className="glass glass-hover p-6 rounded-2xl group cursor-pointer transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
              {problem.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  difficultyColors[problem.difficulty]
                )}
              >
                {problem.difficulty}
              </span>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Tag className="w-3.5 h-3.5" />
                {problem.topic}
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              <span>Top Pick</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>15 mins</span>
            </div>
          </div>
          {problem.solved && (
            <span className="text-green-400 font-medium">Solved</span>
          )}
        </div>
      </div>
    </Link>
  );
});
