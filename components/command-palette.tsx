'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commands = [
    {
      label: 'Dashboard',
      description: 'Go to main dashboard',
      shortcut: 'G D',
      action: () => router.push('/dashboard'),
    },
    {
      label: 'Start Interview',
      description: 'Begin a new interview',
      shortcut: 'G I',
      action: () => router.push('/dashboard/interview'),
    },
    {
      label: 'Analytics',
      description: 'View your performance',
      shortcut: 'G A',
      action: () => router.push('/dashboard/analytics'),
    },
    {
      label: 'History',
      description: 'Review past interviews',
      shortcut: 'G H',
      action: () => router.push('/dashboard/history'),
    },
    {
      label: 'Profile',
      description: 'Manage your profile',
      shortcut: 'G P',
      action: () => router.push('/dashboard/profile'),
    },
    {
      label: 'Settings',
      description: 'Adjust preferences',
      shortcut: 'G S',
      action: () => router.push('/dashboard/settings'),
    },
  ];

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-1/4 z-50 w-full max-w-md -translate-x-1/2 rounded-xl border border-border bg-background shadow-lg overflow-hidden"
          >
            <Command className="[&_[cmdk-input]]:border-b [&_[cmdk-input]]:border-border [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-3 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <Search size={18} className="text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Command.List className="max-h-96 overflow-y-auto">
                <Command.Empty className="py-6 text-center text-muted-foreground text-sm">
                  No commands found.
                </Command.Empty>
                <Command.Group heading="Navigation">
                  {commands.map((command) => (
                    <Command.Item
                      key={command.label}
                      onSelect={command.action}
                      className="flex items-center justify-between cursor-pointer hover:bg-accent/60 data-[selected]:bg-accent"
                      onClick={() => {
                        command.action();
                        setOpen(false);
                      }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {command.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {command.description}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground ml-4">
                        {command.shortcut}
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-accent/40 text-muted-foreground hover:bg-accent/60 transition-colors text-sm"
      >
        <Search size={16} />
        <span>Search...</span>
        <span className="text-xs ml-auto opacity-50">⌘K</span>
      </button>
    </>
  );
}
