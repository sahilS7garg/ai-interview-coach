"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ChevronLeft, Play, Info, CheckCircle, Code } from "lucide-react";
import Link from "next/link";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/problems/${id}`);
        if (!response.ok) throw new Error("Problem not found");
        const data = await response.json();
        setProblem(data);
        
        // Check if already solved (optional optimization)
        const token = localStorage.getItem('token');
        if (token) {
           const progressRes = await fetch('http://localhost:5000/api/users/progress', {
             headers: { 'Authorization': `Bearer ${token}` }
           });
           if (progressRes.ok) {
             const progress = await progressRes.json();
             if (progress.solvedProblems.includes(id)) {
               setSolved(true);
             }
           }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to submit solutions");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/problems/${id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setSolved(true);
        alert("Solution submitted successfully!");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">{error}</div>;

  return (
    <main className="min-h-screen pt-28 pb-12 px-6">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <Link href="/problems" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Problems
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-3xl">
              <h1 className="text-3xl font-bold text-white mb-4">{problem.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {problem.difficulty}
                </span>
                <span className="text-gray-500 text-sm">{problem.topic}</span>
                {solved && <span className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase"><CheckCircle className="w-4 h-4" /> Solved</span>}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {problem.description}
                </p>
              </div>
            </div>

            {problem.constraints && problem.constraints.length > 0 && (
              <div className="glass p-8 rounded-3xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Constraints
                </h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  {problem.constraints.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {problem.examples && problem.examples.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Examples
                </h2>
                {problem.examples.map((ex: any, i: number) => (
                  <div key={i} className="glass p-6 rounded-2xl border-l-4 border-primary">
                    <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">Example {i + 1}</p>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500 text-sm block mb-1">Input</span>
                        <code className="bg-black/50 p-2 rounded block text-white">{ex.input}</code>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm block mb-1">Output</span>
                        <code className="bg-black/50 p-2 rounded block text-white">{ex.output}</code>
                      </div>
                      {ex.explanation && (
                        <div>
                          <span className="text-gray-500 text-sm block mb-1">Explanation</span>
                          <p className="text-gray-400 text-sm">{ex.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl sticky top-28">
              <button 
                onClick={handleSubmit}
                disabled={submitting || solved}
                className={`w-full py-4 ${solved ? 'bg-gray-700 text-gray-400' : 'bg-primary text-black hover:bg-emerald-400'} font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg mb-4`}
              >
                {submitting ? "Submitting..." : solved ? "Already Solved" : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Submit Solution
                  </>
                )}
              </button>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Solved by</span>
                  <span className="text-white font-medium">1,234 candidates</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Success Rate</span>
                  <span className="text-white font-medium">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
