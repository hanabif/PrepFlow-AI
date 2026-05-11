'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import {
  Download,
  Share2,
  RotateCw,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { StaggerContainer, FadeIn, SlideInRight } from '@/components/motion';

const scoreCategories = [
  { name: 'Communication', value: 82 },
  { name: 'Technical Knowledge', value: 75 },
  { name: 'Problem-Solving', value: 88 },
  { name: 'Confidence', value: 79 },
  { name: 'Clarity', value: 85 },
];

const strengthsData = [
  { label: 'Clear explanations', score: 88, color: '#10b981' },
  { label: 'Structured approach', score: 85, color: '#10b981' },
  { label: 'Technical depth', score: 82, color: '#10b981' },
  { label: 'Time management', score: 78, color: '#3b82f6' },
];

const improvementAreas = [
  { label: 'Confidence', score: 65, color: '#ef4444' },
  { label: 'System design thinking', score: 68, color: '#ef4444' },
  { label: 'Follow-up questions', score: 72, color: '#f59e0b' },
];

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const [isExporting, setIsExporting] = useState(false);

  const overallScore = 82;
  const scoreImprovement = '+5%';

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <StaggerContainer>
          <motion.div
            className="mb-12"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Interview Feedback
                </h1>
                <p className="text-muted-foreground">
                  Detailed analysis of your interview performance
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleExport}
                  disabled={isExporting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-accent/40 text-foreground hover:bg-accent/60 disabled:opacity-50 transition-colors"
                >
                  <Download size={18} />
                  {isExporting ? 'Exporting...' : 'Export PDF'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-accent/40 text-foreground hover:bg-accent/60 transition-colors"
                >
                  <Share2 size={18} />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Overall Score Card */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {[
                {
                  label: 'Overall Score',
                  value: overallScore,
                  max: 100,
                  color: 'from-emerald-600 to-teal-600',
                },
                {
                  label: 'Interview Duration',
                  value: '18',
                  unit: 'min',
                  color: 'from-blue-600 to-cyan-600',
                },
                {
                  label: 'Score Improvement',
                  value: scoreImprovement,
                  color: 'from-amber-600 to-orange-600',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-gradient-to-br from-accent/60 to-accent/30 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {item.label}
                  </p>
                  <div className="flex items-end gap-2">
                    <span
                      className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                    >
                      {item.value}
                    </span>
                    {item.unit && (
                      <span className="text-lg text-muted-foreground mb-1">
                        {item.unit}
                      </span>
                    )}
                    {item.max && (
                      <span className="text-lg text-muted-foreground mb-1">
                        / {item.max}
                      </span>
                    )}
                  </div>
                  {item.label === 'Overall Score' && (
                    <div className="mt-4 w-full bg-border rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r ${item.color} h-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(overallScore / 100) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Radar Chart */}
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
            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Performance Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={scoreCategories}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis
                    dataKey="name"
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

            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Score Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
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
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Strengths & Improvements */}
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
            {/* Strengths */}
            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Your Strengths
                </h3>
              </div>
              <div className="space-y-4">
                {strengthsData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-emerald-400">
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Areas for Improvement */}
            <motion.div
              className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle size={20} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Areas to Improve
                </h3>
              </div>
              <div className="space-y-4">
                {improvementAreas.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-amber-400">
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            className="p-6 rounded-xl border border-border bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm mb-12"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              AI-Generated Recommendations
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-foreground leading-relaxed">
                  <strong>Practice confidence:</strong> Work on speaking with more
                  certainty. Record yourself answering questions and listen for filler
                  words like "um" and "uh".
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-foreground leading-relaxed">
                  <strong>System design deep dive:</strong> Focus on understanding
                  trade-offs in system architecture. Study case studies from large tech
                  companies.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-foreground leading-relaxed">
                  <strong>Ask clarifying questions:</strong> When given a problem,
                  always ask 2-3 clarifying questions before diving into solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3 justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.button
              onClick={() => router.push('/dashboard/interview')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
            >
              <RotateCw size={18} />
              Try Another Interview
            </motion.button>
            <motion.button
              onClick={() => router.push('/dashboard/analytics')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 font-medium transition-all"
            >
              View Analytics
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
