'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Mail,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { StaggerContainer } from '@/components/motion';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Passionate about building scalable systems and mentoring junior engineers.',
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'System Design',
      'Python',
      'AWS',
    ],
    links: {
      website: 'alexjohnson.dev',
      github: 'github.com/alexjohnson',
      linkedin: 'linkedin.com/in/alexjohnson',
      twitter: '@alexjohnson',
    },
  });

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillToggle = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const allSkills = [
    'React',
    'Vue',
    'Angular',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust',
    'System Design',
    'AWS',
    'Docker',
    'Kubernetes',
    'SQL',
    'MongoDB',
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <StaggerContainer>
          {/* Header */}
          <motion.div
            className="mb-8 flex items-center justify-between"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your account and interview preferences
              </p>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isEditing
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-primary/20 text-primary border border-primary/30'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </motion.button>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="p-8 rounded-xl border border-border bg-accent/40 backdrop-blur-sm mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-border">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                  AJ
                </div>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <Upload size={16} />
                  </motion.button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileChange('name', e.target.value)
                        }
                        className="mt-2 w-full px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Title
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) =>
                          handleProfileChange('title', e.target.value)
                        }
                        className="mt-2 w-full px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-lg text-primary mb-3">{profile.title}</p>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <Mail size={16} />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange('email', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      handleProfileChange('location', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <p className="text-foreground">{profile.location}</p>
                )}
              </motion.div>
            </div>

            {/* Bio */}
            <motion.div
              className="mb-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-24"
                />
              ) : (
                <p className="text-foreground leading-relaxed">{profile.bio}</p>
              )}
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="text-sm font-medium text-muted-foreground mb-4 block">
                Technical Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <motion.button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    disabled={!isEditing}
                    whileHover={isEditing ? { scale: 1.05 } : {}}
                    whileTap={isEditing ? { scale: 0.95 } : {}}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      profile.skills.includes(skill)
                        ? 'bg-primary/30 text-primary border border-primary/50'
                        : 'bg-accent/50 text-muted-foreground border border-border hover:bg-accent/70'
                    } ${!isEditing ? 'cursor-default' : ''}`}
                  >
                    {skill}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="p-8 rounded-xl border border-border bg-accent/40 backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Social Links
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: 'Website',
                  key: 'website',
                  icon: LinkIcon,
                  placeholder: 'example.com',
                },
                {
                  label: 'GitHub',
                  key: 'github',
                  icon: Github,
                  placeholder: 'github.com/username',
                },
                {
                  label: 'LinkedIn',
                  key: 'linkedin',
                  icon: Linkedin,
                  placeholder: 'linkedin.com/in/username',
                },
                {
                  label: 'Twitter',
                  key: 'twitter',
                  icon: Twitter,
                  placeholder: '@username',
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.key}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Icon size={20} className="text-muted-foreground" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.links[social.key]}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            links: {
                              ...prev.links,
                              [social.key]: e.target.value,
                            },
                          }))
                        }
                        placeholder={social.placeholder}
                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-accent/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <p className="text-foreground">
                        {profile.links[social.key] || 'Not added'}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
}
