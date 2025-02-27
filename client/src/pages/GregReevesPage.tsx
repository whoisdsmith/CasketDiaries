import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import ParticleSystem from '@/components/common/ParticleSystem';
import Footer from '@/components/common/Footer';
import CharacterProfile from '@/components/common/CharacterProfile';
import ChapterCard from '@/components/common/ChapterCard';

const chapters = [
  { id: 'cemetery-souls', title: 'Cemetery Souls' },
  { id: 'cemetery-weather', title: 'Cemetery Weather' },
  { id: 'gray-yellowcard-shirt', title: 'Gray Yellowcard Shirt' },
  { id: 'embers-of-us', title: 'Embers of Us' },
  { id: 'side-by-side', title: 'Side By Side, Hand In Hand' },
  { id: 'a-love-that-burns', title: 'A Love That Burns Forever' },
  { id: 'until-the-last-light', title: 'Until The Last Light Fades' },
];

const GregReevesPage = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [chapterContent, setChapterContent] = useState<string>('');

  // Simulate content loading for each chapter
  useEffect(() => {
    // This would typically fetch from an API or markdown file
    setChapterContent(`
      <h2 class="text-2xl text-[#FF9E2C] mb-4">Chapter: ${chapters.find(c => c.id === activeChapter)?.title}</h2>
      
      <p class="mb-4">The content for Greg's chapter "${chapters.find(c => c.id === activeChapter)?.title}" will be displayed here, featuring his perspective and journey through this part of the story.</p>
      
      <p class="mb-4">Greg's chapters explore themes of addiction, redemption, love, and the struggle to reconcile his past with his present. Through his eyes, we witness the raw, unfiltered emotion of a man fighting to hold onto hope in the midst of darkness.</p>
      
      <blockquote class="border-l-4 border-[#FF9E2C] pl-4 italic my-6">
        "Sometimes I wonder if I'm more ghost than man—haunting the edges of my own life, watching as everything I love slips through my fingers like smoke."
      </blockquote>
      
      <p>Each chapter of Greg's story reveals another layer of his character, another fragment of the man he was, the man he became, and the man he's fighting to be.</p>
    `);
  }, [activeChapter]);

  return (
    <div className="bg-[#1D1D1D] min-h-screen overflow-x-hidden">
      <ParticleSystem count={50} />
      
      <header className="relative z-10 pt-8 pb-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="font-serif text-2xl md:text-3xl text-[#FF9E2C] glow-text hover:text-[#F15A29] transition-colors cursor-pointer">
              The Casket Diaries
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/greg-reeves">
              <span className="text-[#FF9E2C] border-b border-[#FF9E2C] cursor-pointer">
                Greg Reeves
              </span>
            </Link>
            <Link href="/sadie-gray">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
                Sadie Gray
              </span>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Link href="/">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
                Home
              </span>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <CharacterProfile
              name="Greg Reeves"
              fallbackEmoji="🎸"
              themeColor="#FF9E2C"
              description="Musician, father, and a man haunted by his past mistakes. Greg's journey through grief and addiction forms the emotional core of The Casket Diaries."
              details={[
                { label: "Age", value: "35" },
                { label: "Occupation", value: "Musician / Recording Studio Owner" },
                { label: "Hometown", value: "Grand Rapids, MI" }
              ]}
              traits={[
                { 
                  name: "Resilience", 
                  icon: "🛡️", 
                  description: "Despite encountering numerous hardships, Greg has shown an incredible ability to endure and rebuild himself from the ashes of his mistakes."
                },
                { 
                  name: "Addiction", 
                  icon: "⛓️", 
                  description: "Greg's struggle with substance abuse has been a defining element of his journey, representing both his greatest weakness and a catalyst for profound change."
                },
                { 
                  name: "Creativity", 
                  icon: "🎵", 
                  description: "Music has been Greg's lifeline, his means of processing trauma and expressing emotions too complex for words alone."
                }
              ]}
              quote="Sometimes I wonder if I'm more ghost than man—haunting the edges of my own life, watching as everything I love slips through my fingers like smoke."
            />
            
            <nav className="sticky top-10">
              <h3 className="text-[#F5F5F5] font-medium mb-2 px-2">Greg's Chapters</h3>
              <ul className="space-y-1">
                {chapters.map(chapter => (
                  <li key={chapter.id}>
                    <ChapterCard
                      title={chapter.title}
                      isActive={activeChapter === chapter.id}
                      onClick={() => setActiveChapter(chapter.id)}
                      themeColor="#FF9E2C"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          <main className="md:w-3/4">
            <div className="bg-[#1A1E26] rounded-lg p-6 shadow-lg border border-[#2D2D2D]">
              <h1 className="font-serif text-3xl text-[#FF9E2C] mb-6">
                The Chapters of Greg
              </h1>
              
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: chapterContent }}
              />
              
              <div className="mt-8 pt-6 border-t border-[#2D2D2D]">
                <blockquote className="text-[#F5F5F5] italic text-lg">
                  "We are the stories we tell ourselves. And sometimes, we need to rewrite those stories to find our way back to the light."
                </blockquote>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GregReevesPage;