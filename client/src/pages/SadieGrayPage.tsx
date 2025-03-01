import { useState } from 'react';
import { Link } from 'wouter';
import ParticleSystem from '@/components/common/ParticleSystem';
import Footer from '@/components/common/Footer';
import CharacterProfile from '@/components/common/CharacterProfile';
import ChapterCard from '@/components/common/ChapterCard';
import { useQuery } from '@tanstack/react-query';

// Define Sadie's chapters with IDs matching the API endpoint
const chapters = [
  { id: 'beneath-a-broken-roof', title: 'Beneath a Broken Roof' },
  { id: 'empty-womb-empty-tomb', title: 'Empty Womb, Empty Tomb' },
  { id: 'fading-blue-paint', title: 'Fading Blue Paint' },
  { id: 'ghost-in-the-sun', title: 'Ghost in the Sun' },
  { id: 'graveyard-anthem', title: 'Graveyard Anthem' },
  { id: 'rearview-reflections', title: 'Rearview Reflections' },
  { id: 'the-aftermath', title: 'The Aftermath' },
  { id: 'the-empty-space', title: 'The Empty Space Between You and Me' },
];

const SadieGrayPage = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

  // Fetch chapter content from the API
  const { data: chapterData, isLoading, isError } = useQuery({
    queryKey: ['/api/chapters/sadie', activeChapter],
    queryFn: async () => {
      const response = await fetch(`/api/chapters/sadie/${activeChapter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chapter content');
      }
      return response.json();
    }
  });

  // Format the content with special styling for poetry
  const formatChapterContent = () => {
    if (!chapterData) return '';
    
    // Process and format the HTML content from the API
    // Replace markdown # headers with styled headers
    let formattedContent = chapterData.html
      // Replace h1 with styled heading
      .replace(/<h1[^>]*>(.*?)<\/h1>/g, 
        `<h2 class="text-2xl text-[#FF9E2C] mb-4">$1</h2>`)
      // Add styling to paragraphs
      .replace(/<p>(.*?)<\/p>/g,
        `<p class="mb-4 leading-relaxed">$1</p>`)
      // Style horizontal rules for section breaks
      .replace(/<hr>/g, 
        `<hr class="my-6 border-t border-[#2D2D2D]" />`)
      // Special formatting for blockquotes
      .replace(/<blockquote>(.*?)<\/blockquote>/g,
        `<blockquote class="border-l-4 border-[#FF9E2C] pl-4 italic my-6">$1</blockquote>`);
      
    return formattedContent;
  };

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
            
            <nav className="sticky top-10 mt-6">
              <h3 className="text-[#F5F5F5] font-medium mb-2 px-2">Sadie's Chapters</h3>
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
                The Chapters of Sadie
              </h1>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-6 bg-[#2D2D2D] rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-[#2D2D2D] rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-[#2D2D2D] rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-[#2D2D2D] rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-[#2D2D2D] rounded w-1/3 mb-2"></div>
                  </div>
                  <p className="text-[#B0B0B0] mt-4">Loading chapter content...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-8 text-red-500">
                  <p>Error loading chapter content. Please try again.</p>
                </div>
              ) : (
                <div 
                  className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-[#FF9E2C] prose-blockquote:border-[#FF9E2C] prose-hr:border-[#2D2D2D]"
                  dangerouslySetInnerHTML={{ __html: formatChapterContent() }}
                />
              )}
              
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