import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import ParticleSystem from '@/components/common/ParticleSystem';
import Footer from '@/components/common/Footer';

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
            <a className="font-serif text-2xl md:text-3xl text-[#FF9E2C] glow-text hover:text-[#F15A29] transition-colors">
              The Casket Diaries
            </a>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors">About</a>
            </Link>
            <Link href="/greg-reeves">
              <a className="text-[#FF9E2C] border-b border-[#FF9E2C]">Greg Reeves</a>
            </Link>
            <Link href="/sadie-gray">
              <a className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors">Sadie Gray</a>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Link href="/">
              <a className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors">Home</a>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <div className="bg-[#1A1E26] rounded-lg p-6 mb-6 shadow-lg border border-[#2D2D2D]">
              <div className="aspect-square bg-[#2D2D2D] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
              <h2 className="font-serif text-2xl text-[#FF9E2C] mb-2">Greg Reeves</h2>
              <p className="text-[#E8E8E8] text-sm mb-4">
                Musician, father, and a man haunted by his past mistakes. Greg's journey through grief and addiction forms the emotional core of The Casket Diaries.
              </p>
              <div className="space-y-1 text-sm">
                <p><span className="text-[#FF9E2C]">Age:</span> <span className="text-[#F5F5F5]">35</span></p>
                <p><span className="text-[#FF9E2C]">Occupation:</span> <span className="text-[#F5F5F5]">Musician / Recording Studio Owner</span></p>
                <p><span className="text-[#FF9E2C]">Hometown:</span> <span className="text-[#F5F5F5]">Grand Rapids, MI</span></p>
              </div>
            </div>
            
            <nav className="sticky top-10">
              <h3 className="text-[#F5F5F5] font-medium mb-2 px-2">Greg's Chapters</h3>
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