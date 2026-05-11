'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Volume2,
  Zap,
  Shield,
  Eye,
  Palette,
  Smartphone,
  Lock,
  LogOut,
} from 'lucide-react';
import { StaggerContainer } from '@/components/motion';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sound: false,
    },
    personalization: {
      difficulty: 'intermediate',
      interviewDuration: '20',
      voiceEnabled: true,
      textEnabled: true,
    },
    appearance: {
      theme: 'dark',
      compactMode: false,
      animations: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
    },
  });

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Email Notifications',
          description: 'Receive email updates on interview completion',
          key: 'email',
          type: 'toggle',
          category: 'notifications',
        },
        {
          label: 'Push Notifications',
          description: 'Get notifications in-browser',
          key: 'push',
          type: 'toggle',
          category: 'notifications',
        },
        {
          label: 'Sound Effects',
          description: 'Play sounds during interviews',
          key: 'sound',
          type: 'toggle',
          category: 'notifications',
        },
      ],
    },
    {
      title: 'AI Personalization',
      icon: Zap,
      settings: [
        {
          label: 'Default Difficulty',
          description: 'Starting difficulty for new interviews',
          key: 'difficulty',
          type: 'select',
          options: ['easy', 'intermediate', 'hard'],
          category: 'personalization',
        },
        {
          label: 'Interview Duration',
          description: 'Minutes per interview',
          key: 'interviewDuration',
          type: 'select',
          options: ['10', '15', '20', '30', '45', '60'],
          category: 'personalization',
        },
        {
          label: 'Voice Mode',
          description: 'Enable voice recording in interviews',
          key: 'voiceEnabled',
          type: 'toggle',
          category: 'personalization',
        },
        {
          label: 'Text Mode',
          description: 'Enable text input in interviews',
          key: 'textEnabled',
          type: 'toggle',
          category: 'personalization',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Theme',
          description: 'Choose your preferred theme',
          key: 'theme',
          type: 'select',
          options: ['dark', 'light', 'auto'],
          category: 'appearance',
        },
        {
          label: 'Compact Mode',
          description: 'Use a more compact interface',
          key: 'compactMode',
          type: 'toggle',
          category: 'appearance',
        },
        {
          label: 'Animations',
          description: 'Enable smooth animations',
          key: 'animations',
          type: 'toggle',
          category: 'appearance',
        },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        {
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          key: 'twoFactor',
          type: 'toggle',
          category: 'security',
        },
        {
          label: 'Session Timeout',
          description: 'Auto-logout after inactivity (minutes)',
          key: 'sessionTimeout',
          type: 'select',
          options: ['15', '30', '60', '120'],
          category: 'security',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <StaggerContainer>
          {/* Header */}
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your preferences and account settings
            </p>
          </motion.div>

          {/* Settings Sections */}
          <motion.div
            className="space-y-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {sections.map((section, sectionIdx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={sectionIdx}
                  className="p-6 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  {/* Settings Items */}
                  <div className="space-y-4">
                    {section.settings.map((setting, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-primary/5 transition-colors"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {setting.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>

                        {/* Toggle / Select */}
                        <div className="ml-4 flex-shrink-0">
                          {setting.type === 'toggle' ? (
                            <motion.button
                              onClick={() =>
                                handleToggle(setting.category, setting.key)
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings[setting.category][setting.key]
                                  ? 'bg-primary'
                                  : 'bg-accent/60'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.span
                                className="inline-block h-4 w-4 transform rounded-full bg-white"
                                animate={{
                                  x: settings[setting.category][setting.key]
                                    ? 20
                                    : 2,
                                }}
                                transition={{ type: 'spring', stiffness: 500 }}
                              />
                            </motion.button>
                          ) : (
                            <select
                              value={settings[setting.category][setting.key]}
                              onChange={(e) =>
                                handleChange(
                                  setting.category,
                                  setting.key,
                                  e.target.value
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-accent/60 text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              {setting.options.map((option) => (
                                <option key={option} value={option}>
                                  {option === 'dark' || option === 'light' || option === 'auto'
                                    ? option.charAt(0).toUpperCase() +
                                      option.slice(1)
                                    : option === 'easy' ||
                                        option === 'intermediate' ||
                                        option === 'hard'
                                      ? option.charAt(0).toUpperCase() +
                                        option.slice(1)
                                      : option}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            className="mt-8 p-6 rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-lg font-semibold text-red-400 mb-4">
              Danger Zone
            </h2>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium"
              >
                <LogOut size={18} />
                Sign Out of All Devices
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium"
              >
                <Lock size={18} />
                Change Password
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium"
              >
                <Eye size={18} />
                Download My Data
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-medium"
              >
                <Lock size={18} />
                Delete Account
              </motion.button>
            </div>
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
