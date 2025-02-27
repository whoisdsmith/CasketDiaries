import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterPortrait from './CharacterPortrait';

interface CharacterTrait {
  name: string;
  description: string;
  icon: string;
}

interface CharacterDetail {
  label: string;
  value: string;
}

interface CharacterProfileProps {
  name: string;
  imageSrc?: string;
  fallbackEmoji: string;
  themeColor: string;
  description: string;
  details: CharacterDetail[];
  traits?: CharacterTrait[];
  quote?: string;
}

const CharacterProfile = ({
  name,
  imageSrc,
  fallbackEmoji,
  themeColor,
  description,
  details,
  traits = [],
  quote
}: CharacterProfileProps) => {
  const [activeTab, setActiveTab] = useState<'about' | 'traits'>('about');
  const [expandedTrait, setExpandedTrait] = useState<string | null>(null);

  return (
    <div className="bg-[#1A1E26] rounded-lg p-5 shadow-lg border border-[#2D2D2D]">
      <div className="mb-6">
        <CharacterPortrait
          name={name}
          imageSrc={imageSrc}
          fallbackEmoji={fallbackEmoji}
          themeColor={themeColor}
        />
      </div>

      <h2 
        className="font-serif text-2xl mb-3"
        style={{ color: themeColor }}
      >
        {name}
      </h2>

      {/* Tabs */}
      {traits.length > 0 && (
        <div className="flex mb-4 border-b border-[#2D2D2D]">
          <button
            className={`px-4 py-2 relative ${activeTab === 'about' ? 'text-[#F5F5F5]' : 'text-[#8A8A8A]'}`}
            onClick={() => setActiveTab('about')}
          >
            About
            {activeTab === 'about' && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: themeColor }}
                initial={false}
              />
            )}
          </button>
          <button
            className={`px-4 py-2 relative ${activeTab === 'traits' ? 'text-[#F5F5F5]' : 'text-[#8A8A8A]'}`}
            onClick={() => setActiveTab('traits')}
          >
            Traits
            {activeTab === 'traits' && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: themeColor }}
                initial={false}
              />
            )}
          </button>
        </div>
      )}

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'about' ? (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[#E8E8E8] text-sm mb-4">
              {description}
            </p>

            {/* Character Details */}
            <div className="space-y-1 text-sm mb-4">
              {details.map((detail, index) => (
                <p key={index}>
                  <span style={{ color: themeColor }}>{detail.label}:</span>{' '}
                  <span className="text-[#F5F5F5]">{detail.value}</span>
                </p>
              ))}
            </div>

            {/* Quote */}
            {quote && (
              <motion.div
                className="mt-4 pl-3 border-l-2 italic text-[#D0D0D0]"
                style={{ borderColor: themeColor }}
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                "{quote}"
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="traits"
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {traits.map((trait, index) => (
              <motion.div 
                key={trait.name}
                className="bg-[#232B38] rounded-md overflow-hidden cursor-pointer"
                layoutId={`trait-${trait.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  height: expandedTrait === trait.name ? 'auto' : 'auto'
                }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.05
                }}
                onClick={() => setExpandedTrait(expandedTrait === trait.name ? null : trait.name)}
              >
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2">{trait.icon}</span>
                    <span style={{ color: themeColor }}>{trait.name}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedTrait === trait.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xs">▼</span>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedTrait === trait.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-2 text-sm text-[#E8E8E8] border-t border-[#2D2D2D]"
                    >
                      {trait.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterProfile;