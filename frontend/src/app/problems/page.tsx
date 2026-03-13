"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProblemCard from "@/components/problems/ProblemCard";
import { Search, SlidersHorizontal, Trophy } from "lucide-react";

// Mock data for initial render verification
const MOCK_PROBLEMS = [
  { _id: "1", title: "Two Sum", difficulty: "Easy", topic: "Arrays" },
  { _id: "2", title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List" },
  { _id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Hash Table" },
  { _id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search" },
  { _id: "5", title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Dynamic Programming" },
] as const;

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/problems');
        if (!response.ok) throw new Error('Failed to fetch problems');
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(p => 
    (filter === "All" || p.topic === filter) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen pt-28 pb-12 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-float">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Practice Problems</h1>
            <p className="text-gray-400">Master your coding skills with AI-curated challenges.</p>
          </div>
          
          <div className="flex items-center gap-4 glass px-6 py-4 rounded-3xl">
            <div className="w-12 h-12 bg-amber-400/20 rounded-2xl flex items-center justify-center">
              <Trophy className="text-amber-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Your Progress</p>
              <p className="text-white font-bold">{problems.length > 0 ? 'Loading...' : '0 / 0 Solved'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search problems by title or topic..."
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            <select 
              className="bg-transparent text-gray-300 text-sm font-medium outline-none cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Topics</option>
              <option value="Arrays">Arrays</option>
              <option value="Greedy">Greedy</option>
              <option value="DP">Dynamic Programming</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 animate-pulse">Loading problems...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
