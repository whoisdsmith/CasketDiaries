import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import ParticleSystem from '@/components/common/ParticleSystem';
import Footer from '@/components/common/Footer';
import CharacterProfile from '@/components/common/CharacterProfile';

const chapters = [
  { id: 'beneath-broken-roof', title: 'Beneath a Broken Roof' },
  { id: 'empty-womb', title: 'Empty Womb, Empty Tomb' },
  { id: 'fading-blue-paint', title: 'Fading Blue Paint' },
  { id: 'ghost-in-sun', title: 'Ghost in the Sun' },
  { id: 'graveyard-anthem', title: 'Graveyard Anthem' },
  { id: 'rearview-reflections', title: 'Rearview Reflections' },
  { id: 'the-aftermath', title: 'The Aftermath' },
  { id: 'empty-space', title: 'The Empty Space Between You and Me' },
];

const SadieGrayPage = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [chapterContent, setChapterContent] = useState<string>('');

  // Simulate content loading for each chapter
  useEffect(() => {
    // This would typically fetch from an API or markdown file
    setChapterContent(`
      <h2 class="text-2xl text-[#FF9E2C] mb-4">Chapter: ${chapters.find(c => c.id === activeChapter)?.title}</h2>
      
      <p class="mb-4">The content for Sadie's chapter "${chapters.find(c => c.id === activeChapter)?.title}" will be displayed here, revealing her perspective and emotional journey through this part of the story.</p>
      
      <p class="mb-4">Sadie's chapters delve into themes of resilience, heartbreak, and the quiet strength it takes to rebuild a life from the fragments of what once was. Her voice provides a counterpoint to Greg's, offering a different lens through which to view their shared history.</p>
      
      <blockquote class="border-l-4 border-[#FF9E2C] pl-4 italic my-6">
        "I spent so long trying to fix what was broken in him that I forgot to notice what was breaking in me. Now, I'm learning to put those pieces back together—not for him, but for myself."
      </blockquote>
      
      <p>Each chapter of Sadie's story reveals another facet of her character, another step in her journey from love to loss to the hard-won peace that comes from finally letting go.</p>
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
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
                Greg Reeves
              </span>
            </Link>
            <Link href="/sadie-gray">
              <span className="text-[#FF9E2C] border-b border-[#FF9E2C] cursor-pointer">
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
              name="Sadie Gray"
              fallbackEmoji="🎨"
              themeColor="#FF9E2C"
              description="Artist, survivor, and a woman rediscovering her strength. Sadie's story is one of resilience in the face of devastating loss and the courage to start anew."
              details={[
                { label: "Age", value: "33" },
                { label: "Occupation", value: "Art Teacher / Painter" },
                { label: "Hometown", value: "Traverse City, MI" }
              ]}
              traits={[
                { 
                  name: "Resilience", 
                  icon: "💪", 
                  description: "After enduring unimaginable loss, Sadie has rebuilt her life piece by piece, finding strength in the process of healing and creating art from pain."
                },
                { 
                  name: "Intuition", 
                  icon: "🔮", 
                  description: "Sadie has always possessed a deep intuitive understanding of others, often knowing what they need before they do themselves."
                },
                { 
                  name: "Creativity", 
                  icon: "🖌️", 
                  description: "Art has been Sadie's salvation, her method of processing grief and transforming tragedy into something that speaks to the universal human experience."
                }
              ]}
              quote="I spent so long trying to fix what was broken in him that I forgot to notice what was breaking in me. Now, I'm learning to put those pieces back together—not for him, but for myself."
            />
            
            <nav className="sticky top-10">
              <h3 className="text-[#F5F5F5] font-medium mb-2 px-2">Sadie's Chapters</h3>
              <ul className="space-y-1">
                {chapters.map(chapter => (
                  <li key={chapter.id}>
                    <button 
                      onClick={() => setActiveChapter(chapter.id)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeChapter === chapter.id 
                          ? 'bg-[#232B38] text-[#FF9E2C]' 
                          : 'text-[#F5F5F5] hover:bg-[#2D2D2D]'
                      }`}
                    >
                      {chapter.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          <main className="md:w-3/4">
            <div className="bg-[#1A1E26] rounded-lg p-6 shadow-lg border border-[#2D2D2D]">
              <h1 className="font-serif text-3xl text-[#FF9E2C] mb-6">
                The Chapters of Sadie
              </h1>
              
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: chapterContent }}
              />
              
              <div className="mt-8 pt-6 border-t border-[#2D2D2D]">
                <blockquote className="text-[#F5F5F5] italic text-lg">
                  "Some loves burn so bright they leave nothing but ashes in their wake. From those ashes, I'm building something new—something that's wholly mine."
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

export default SadieGrayPage;