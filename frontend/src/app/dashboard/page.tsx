"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProblemCard from "@/components/problems/ProblemCard";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Target, Zap, Activity, Award } from "lucide-react";

const MOCK_stats = [
  { name: "Mon", solved: 2 },
  { name: "Tue", solved: 5 },
  { name: "Wed", solved: 3 },
  { name: "Thu", solved: 8 },
  { name: "Fri", solved: 6 },
  { name: "Sat", solved: 12 },
  { name: "Sun", solved: 10 },
];

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [progressRes, recRes] = await Promise.all([
          fetch('http://localhost:5000/api/users/progress', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/users/recommendations', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (progressRes.ok) setUserStats(await progressRes.json());
        if (recRes.ok) setRecommendations(await recRes.json());
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Dashboard...</div>;

  const stats = [
    { label: "Solved", value: userStats?.solvedProblems?.length || "0", icon: Target, color: "text-primary" },
    { label: "Accuracy", value: `${userStats?.accuracy || 0}%`, icon: Zap, color: "text-amber-400" },
    { label: "Streak", value: `${userStats?.streak || 0} Days`, icon: Activity, color: "text-rose-400" },
    { label: "Badges", value: "0", icon: Award, color: "text-emerald-400" },
  ];

  return (
    <main className="min-h-screen pt-28 pb-12 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, {userStats?.username || 'Candidate'}</h1>
          <p className="text-gray-400">Your interview readiness is increasing. Here's your summary.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analytics Chart */}
          <div className="lg:col-span-2 glass p-8 rounded-3xl min-h-[400px]">
            <h3 className="text-xl font-bold text-white mb-8">Performance Analytics</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_stats}>
                  <defs>
                    <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "12px" }}
                    itemStyle={{ color: "#6366f1" }}
                  />
                  <Area type="monotone" dataKey="solved" stroke="#6366f1" fillOpacity={1} fill="url(#colorSolved)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations Right Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">AI Recommended</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {recommendations.length > 0 ? recommendations.map((p) => (
                <div key={p._id} className="transform hover:-translate-y-1 transition-transform">
                  <ProblemCard problem={p} />
                </div>
              )) : (
                <p className="text-gray-500 text-sm italic">Solve more problems to get personalized recommendations!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
