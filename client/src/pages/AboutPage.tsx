import { useState } from 'react';
import { Link } from 'wouter';
import ParticleSystem from '@/components/common/ParticleSystem';
import Footer from '@/components/common/Footer';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('about');

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
              <span className="text-[#FF9E2C] border-b border-[#FF9E2C] cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/greg-reeves">
              <span className="text-[#F5F5F5] hover:text-[#FF9E2C] transition-colors cursor-pointer">
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
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            <nav className="sticky top-10">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'about' 
                        ? 'bg-[#232B38] text-[#FF9E2C]' 
                        : 'text-[#F5F5F5] hover:bg-[#2D2D2D]'
                    }`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('authors-note')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'authors-note' 
                        ? 'bg-[#232B38] text-[#FF9E2C]' 
                        : 'text-[#F5F5F5] hover:bg-[#2D2D2D]'
                    }`}
                  >
                    Author's Note
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('synopsis')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeSection === 'synopsis' 
                        ? 'bg-[#232B38] text-[#FF9E2C]' 
                        : 'text-[#F5F5F5] hover:bg-[#2D2D2D]'
                    }`}
                  >
                    Synopsis
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
          
          <main className="md:w-3/4">
            {activeSection === 'about' && (
              <div className="bg-[#1A1E26] rounded-lg p-6 shadow-lg border border-[#2D2D2D]">
                <h1 className="font-serif text-3xl text-[#FF9E2C] mb-6">About</h1>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#E8E8E8] mb-4">
                    At the heart of <em>The Casket Diaries</em> lies a deeply human story—one that explores love, betrayal, grief, and the unbreakable bonds that define us. The novel follows Greg Reeves, a man whose life is fractured by unimaginable loss and the burden of past mistakes. As he struggles to reconcile his former self with the darkness that threatens to consume him, Greg's journey becomes a powerful meditation on identity, redemption, and the ghosts that linger in our hearts.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    Told through a series of poignant chapters that weave between past and present, <em>The Casket Diaries</em> delves into the raw, unfiltered emotions of its characters. The narrative is rich with themes of transformation, justice versus revenge, and the struggle between light and darkness—both within and outside ourselves.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    This is not just a love story, nor merely a tale of sorrow; it is a testament to the resilience of the human spirit. Through lyrical prose and emotionally charged storytelling, <em>The Casket Diaries</em> invites readers into a world where love lingers beyond loss and where the echoes of the past shape the future in ways we can never anticipate.
                  </p>
                  
                  <div className="my-6 bg-[#232B38] p-4 rounded-md">
                    <p className="mb-2"><span className="text-[#FF9E2C]">🔹 Themes:</span> <span className="text-[#F5F5F5]">Trauma, resilience, redemption, love, betrayal, grief</span></p>
                    <p className="mb-2"><span className="text-[#FF9E2C]">🔹 Genre:</span> <span className="text-[#F5F5F5]">Contemporary fiction / Psychological drama</span></p>
                    <p><span className="text-[#FF9E2C]">🔹 Notable Elements:</span> <span className="text-[#F5F5F5]">Dual timelines, introspective narration, deep character psychology</span></p>
                  </div>
                  
                  <p className="text-[#E8E8E8]">
                    As a writer, my goal is to craft stories that resonate on a deeply personal level, leaving readers with a sense of catharsis and connection. <em>The Casket Diaries</em> is not just a novel—it is an experience.
                  </p>
                </div>
              </div>
            )}
            
            {activeSection === 'authors-note' && (
              <div className="bg-[#1A1E26] rounded-lg p-6 shadow-lg border border-[#2D2D2D]">
                <h1 className="font-serif text-3xl text-[#FF9E2C] mb-6">Author's Note</h1>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#E8E8E8] mb-4">
                    When I first started The Casket Diaries back in 2019, it wasn't a novel—it was music. It was the name of my band, the title under which I poured out hundreds of songs, each one a raw, unfiltered journal entry. It was messy, angry, and unhinged. It was my story—but only one side of it.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    By 2021, The Casket Diaries had shifted into a journal and blog, a place where I continued to process my experiences. And yet, something still felt incomplete. No matter how many times I reshaped it, I couldn't seem to let go of this project. It kept evolving, changing forms, refusing to settle into something final. It wasn't until early 2024 that I truly understood why.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    For years, I had been telling my story as a singular narrative—one voice, one perspective. I had cast myself as the victim, as the hero, as the only one who truly felt the weight of it all. But life, love, grief, and redemption don't work that way. They are never just one-sided.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    That's when I realized that The Casket Diaries had to be something more. It couldn't just be a journal. It couldn't just be a song. It had to be both—a novel that captured not just my story, but the stories of everyone involved. So, I wrote it. From the beginning. From childhood to mid-life, from heartbreak to healing.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    But I didn't stop there. The same way The Casket Diaries began as music, I knew it needed to end with music too. I wrote songs for each chapter, capturing the emotions of both Greg and Sadie—their perspectives as individuals, their voices entwined. Some songs are his. Some are hers. Some belong to them both.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    It has been an exhausting, relentless journey—one I could never seem to walk away from, no matter how many times I tried. And now, it's finished. Even if I am the only one who ever loves this project, it is something I will forever be proud of.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-6">
                    This story is fiction, but it is also not.<br />
                    This story is mine, but it is also not.
                  </p>
                  
                  <p className="text-[#FF9E2C] text-right italic">— Dustin Smith</p>
                </div>
              </div>
            )}
            
            {activeSection === 'synopsis' && (
              <div className="bg-[#1A1E26] rounded-lg p-6 shadow-lg border border-[#2D2D2D]">
                <h1 className="font-serif text-3xl text-[#FF9E2C] mb-6">Synopsis</h1>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#E8E8E8] mb-4">
                    The Casket Diaries is a poignant and deeply emotional journey through love, grief, addiction, and the fragile hope that lingers in the spaces between heartbreaks. Set in the quiet towns and sprawling landscapes of Michigan, the story follows Greg Reeves and Sadie Grey, two souls whose paths intertwine in the most unexpected of places—a bookstore parking lot.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    Greg, a musician with restless hands and a past he's always running from, meets Sadie, a woman who sees beauty in the broken. Together, they forge a love that burns fiercely, built on whispered promises and the belief that love alone can keep them whole. But life has other plans. As tragedy strikes, their relationship is tested in ways neither could have imagined, forcing them to confront the parts of themselves they've long buried—Greg's struggles with addiction, Sadie's fear of repeating the past, and the ghosts of the life they once envisioned.
                  </p>
                  
                  <p className="text-[#E8E8E8] mb-4">
                    Through years of love and loss, separation and reunion, The Casket Diaries explores whether some loves are destined to endure, or if they are simply echoes of what could have been. Is love enough to mend what's been broken? Or do some stories end in silence, leaving only the lingering resonance of what was?
                  </p>
                  
                  <p className="text-[#E8E8E8]">
                    With lyrical prose and hauntingly intimate storytelling, The Casket Diaries captures the essence of human fragility and resilience, weaving a tale that lingers long after the final page.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;