'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Eye, Download, Trash2 } from 'lucide-react';
import { StaggerContainer } from '@/components/motion';

const interviewHistory = [
  {
    id: 1,
    date: 'Feb 16, 2025',
    role: 'Senior Frontend Engineer',
    type: 'Technical',
    score: 82,
    duration: '18 min',
    questions: 5,
    status: 'completed',
  },
  {
    id: 2,
    date: 'Feb 14, 2025',
    role: 'Full Stack Engineer',
    type: 'System Design',
    score: 78,
    duration: '22 min',
    questions: 4,
    status: 'completed',
  },
  {
    id: 3,
    date: 'Feb 12, 2025',
    role: 'Backend Engineer',
    type: 'Behavioral',
    score: 85,
    duration: '15 min',
    questions: 6,
    status: 'completed',
  },
  {
    id: 4,
    date: 'Feb 10, 2025',
    role: 'Frontend Engineer',
    type: 'Technical',
    score: 79,
    duration: '19 min',
    questions: 5,
    status: 'completed',
  },
  {
    id: 5,
    date: 'Feb 8, 2025',
    role: 'Data Scientist',
    type: 'Technical',
    score: 72,
    duration: '20 min',
    questions: 5,
    status: 'completed',
  },
  {
    id: 6,
    date: 'Feb 5, 2025',
    role: 'DevOps Engineer',
    type: 'System Design',
    score: 68,
    duration: '25 min',
    questions: 4,
    status: 'completed',
  },
];

const typeColors = {
  Technical: 'from-blue-600 to-cyan-600',
  Behavioral: 'from-purple-600 to-pink-600',
  'System Design': 'from-amber-600 to-orange-600',
  Frontend: 'from-emerald-600 to-teal-600',
  Backend: 'from-red-600 to-rose-600',
};

export default function InterviewHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Technical', 'Behavioral', 'System Design', 'Frontend', 'Backend'];

  const filteredInterviews = interviewHistory.filter((interview) => {
    const matchesSearch =
      interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'All' || interview.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/20';
    if (score >= 70) return 'bg-amber-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <StaggerContainer>
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Interview History
            </h1>
            <p className="text-muted-foreground">
              Review all your past interview sessions and feedback
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-8 space-y-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by role or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-accent/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
                      : 'bg-accent/40 text-muted-foreground border border-border hover:bg-accent/60'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Info */}
          <motion.p
            className="text-sm text-muted-foreground mb-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            Showing {filteredInterviews.length} of {interviewHistory.length}{' '}
            interviews
          </motion.p>

          {/* Interview List */}
          <motion.div
            className="space-y-3"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview, idx) => (
                <motion.div
                  key={interview.id}
                  className="p-4 rounded-lg border border-border bg-accent/40 hover:bg-accent/60 transition-all group cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-foreground truncate">
                          {interview.role}
                        </h3>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                            typeColors[interview.type]
                          } text-white whitespace-nowrap`}
                        >
                          {interview.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{interview.date}</span>
                        <span>{interview.duration}</span>
                        <span>{interview.questions} questions</span>
                      </div>
                    </div>

                    {/* Right: Score & Actions */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div
                          className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getScoreBgColor(
                            interview.score
                          )} ${getScoreColor(interview.score)}`}
                        >
                          {interview.score}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                          title="View feedback"
                        >
                          <Eye size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-accent/60 text-muted-foreground hover:text-foreground transition-colors"
                          title="Download report"
                        >
                          <Download size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-12"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <p className="text-muted-foreground">
                  No interviews found matching your filters.
                </p>
              </motion.div>
            )}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
