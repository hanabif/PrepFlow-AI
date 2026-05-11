'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Mic, MicOff, Volume2, AlertCircle, Loader, Check } from 'lucide-react';
import { mockInterviewQuestions } from '@/lib/mock-data';
import { FadeIn, SlideInRight, StaggerContainer } from '@/components/motion';

export default function LiveInterviewPage() {
  const router = useRouter();
  const params = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question
  const [totalTime, setTotalTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [waveformBars, setWaveformBars] = useState(Array(20).fill(30));

  const questions = Object.values(mockInterviewQuestions).slice(0, 5);
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Waveform animation effect
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setWaveformBars(
        Array(20)
          .fill(0)
          .map(() => Math.random() * 60 + 20)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (!isRecording) {
      setShowWaveform(true);
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setShowWaveform(false);
    }
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      setIsSubmitting(true);
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/dashboard/feedback/${params.id}`);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(180);
      setAnswer('');
      setIsRecording(false);
      setShowWaveform(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeColor = timeLeft < 30 ? 'text-red-400' : 'text-muted-foreground';
  const timeBgColor =
    timeLeft < 30 ? 'bg-red-400/10' : 'bg-primary/10';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className={`text-xl font-mono font-bold ${timeColor}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-primary to-primary/60 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Interview Content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1 flex flex-col p-8 max-w-4xl">
            <StaggerContainer>
              {/* AI Interviewer */}
              <motion.div
                className="mb-12 p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary-foreground">
                      AI
                    </span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Interview Question
                    </p>
                    <p className="text-lg leading-relaxed text-foreground">
                      {questions[currentQuestion]?.text}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* User Answer Input */}
              <motion.div
                className="flex-1 flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-4">
                  Your Answer
                </label>

                {/* Recording UI */}
                <AnimatePresence>
                  {showWaveform && (
                    <motion.div
                      className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex-1 flex items-center justify-center gap-1 h-10">
                        {waveformBars.map((height, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-primary rounded-full"
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.1,
                              ease: 'easeOut',
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-primary">
                        Recording...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text Input */}
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type or speak your answer here..."
                  className="flex-1 min-h-[300px] p-4 rounded-xl border border-border bg-accent/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />

                {/* Controls */}
                <div className="flex items-center gap-3 mt-6">
                  <motion.button
                    onClick={handleToggleRecording}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isRecording
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          <MicOff size={18} />
                        </motion.div>
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic size={18} />
                        Start Recording
                      </>
                    )}
                  </motion.button>

                  <div className="flex-1" />

                  <motion.button
                    onClick={handleNext}
                    disabled={isSubmitting || !answer.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : isLastQuestion ? (
                      <>
                        <Check size={18} />
                        Complete Interview
                      </>
                    ) : (
                      <>
                        Next Question
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </StaggerContainer>
          </div>
        </div>

        {/* Right: Progress Sidebar */}
        <div className="w-80 border-l border-border bg-accent/30 p-6 overflow-y-auto hidden lg:flex flex-col">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Questions Overview
            </h3>
            <div className="space-y-2">
              {questions.map((q, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setCurrentQuestion(idx);
                    setTimeLeft(180);
                    setAnswer('');
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    idx === currentQuestion
                      ? 'bg-primary/20 border border-primary/50 text-primary font-medium'
                      : idx < currentQuestion
                        ? 'bg-accent/50 text-muted-foreground hover:bg-accent'
                        : 'bg-accent/30 text-muted-foreground hover:bg-accent/50'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-2">
                    {idx < currentQuestion && (
                      <Check size={16} className="text-green-400" />
                    )}
                    <span className="text-xs font-medium opacity-60">
                      Q{idx + 1}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs mt-1 opacity-80">
                    {q.text}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Interview Stats */}
          <div className="space-y-4 pt-6 border-t border-border mt-auto">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Total Time
              </p>
              <p className="text-lg font-semibold text-foreground">
                {formatTime(totalTime)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Questions Complete
              </p>
              <p className="text-lg font-semibold text-foreground">
                {currentQuestion + 1} / {questions.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
