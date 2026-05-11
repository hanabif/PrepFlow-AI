'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  TrendingUp,
  Target,
  Award,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { StaggerContainer, FadeIn } from '@/components/motion';

const timeRanges = ['Week', 'Month', 'Year', 'All Time'];

const scoreHistoryData = [
  { date: 'Jan 5', score: 62, target: 75 },
  { date: 'Jan 12', score: 68, target: 75 },
  { date: 'Jan 19', score: 71, target: 75 },
  { date: 'Jan 26', score: 74, target: 75 },
  { date: 'Feb 2', score: 78, target: 75 },
  { date: 'Feb 9', score: 80, target: 75 },
  { date: 'Feb 16', score: 82, target: 75 },
];

const skillGrowthData = [
  { skill: 'Communication', value: 82 },
  { skill: 'Technical', value: 75 },
  { skill: 'Problem-Solving', value: 88 },
  { skill: 'Confidence', value: 79 },
  { skill: 'Clarity', value: 85 },
];

const interviewTypeData = [
  { type: 'Technical', count: 12, score: 78 },
  { type: 'Behavioral', count: 8, score: 82 },
  { type: 'System Design', count: 5, score: 72 },
  { type: 'Frontend', count: 6, score: 80 },
  { type: 'Backend', count: 9, score: 76 },
];

const heatmapData = [
  { day: 'Mon', week1: 8, week2: 7, week3: 9, week4: 8 },
  { day: 'Tue', week1: 5, week2: 6, week3: 8, week4: 7 },
  { day: 'Wed', week1: 9, week2: 8, week3: 7, week4: 9 },
  { day: 'Thu', week1: 6, week2: 7, week3: 6, week4: 8 },
  { day: 'Fri', week1: 10, week2: 9, week3: 10, week4: 9 },
  { day: 'Sat', week1: 3, week2: 4, week3: 5, week4: 6 },
  { day: 'Sun', week1: 2, week2: 3, week3: 4, week4: 5 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('Month');

  const stats = [
    {
      label: 'Total Interviews',
      value: '42',
      change: '+8 this month',
      icon: Award,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      label: 'Average Score',
      value: '78',
      change: '+6 from start',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      label: 'Interview Streak',
      value: '12 days',
      change: 'Keep it up!',
      icon: Target,
      color: 'from-amber-600 to-orange-600',
    },
    {
      label: 'Strongest Topic',
      value: 'Problem-Solving',
      change: '88% avg score',
      icon: Award,
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <StaggerContainer>
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Analytics
            </h1>
            <p className="text-muted-foreground mb-6">
              Track your interview preparation progress and identify improvement areas.
            </p>

            {/* Time Range Filter */}
            <div className="flex gap-2 flex-wrap">
              {timeRanges.map((range) => (
                <motion.button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
                      : 'bg-accent/40 text-muted-foreground border border-border hover:bg-accent/60'
                  }`}
                >
                  {range}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-gradient-to-br from-accent/60 to-accent/30 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ translateY: -4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 flex items-center justify-center`}
                    >
                      <Icon className="text-lg" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-3">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs font-medium bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.change}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {/* Score History */}
            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Score Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Skill Breakdown */}
            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Skill Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillGrowthData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Interview Type Performance */}
          <motion.div
            className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm mb-12"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Performance by Interview Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="type"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  yAxisId="left"
                  name="Interview Count"
                />
                <Bar
                  dataKey="score"
                  fill="#10b981"
                  yAxisId="right"
                  name="Average Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Detailed Stats */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {/* Weekly Heatmap */}
            <motion.div
              className="lg:col-span-2 p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Weekly Activity Heatmap
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Week 1', data: 'week1' },
                  { label: 'Week 2', data: 'week2' },
                  { label: 'Week 3', data: 'week3' },
                  { label: 'Week 4', data: 'week4' },
                ].map((week) => (
                  <div key={week.label}>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {week.label}
                    </p>
                    <div className="flex gap-2">
                      {heatmapData.map((day, idx) => {
                        const value = day[week.data];
                        const intensity = value / 10;
                        return (
                          <motion.div
                            key={idx}
                            className="flex-1 rounded-lg p-2 text-center text-xs font-semibold text-white transition-all cursor-help"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            title={`${day.day}: ${value} interviews`}
                          >
                            {value}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Recommendations */}
            <motion.div
              className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                AI Recommendations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Focus Areas',
                    items: ['System Design', 'Confidence', 'Behavioral'],
                  },
                  {
                    title: 'Practice Schedule',
                    items: ['3-4 per week', 'Peak on Fridays', 'Mornings best'],
                  },
                  {
                    title: 'Next Steps',
                    items: ['Deep dive into', 'System Design', 'Next week'],
                  },
                ].map((section, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      {section.title}
                    </p>
                    {section.items.map((item, itemIdx) => (
                      <p
                        key={itemIdx}
                        className="text-sm text-foreground mb-1"
                      >
                        • {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
