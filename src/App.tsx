/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from 'motion/react';
import { 
  Users, 
  Gamepad2, 
  Rocket, 
  Star, 
  Trophy, 
  ChevronDown, 
  MessageSquare, 
  Mail, 
  Disc, 
  Menu, 
  X,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  Layout
} from 'lucide-react';
import { cn, animations } from './lib/utils';

// --- Types ---

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  visits: string;
  active: string;
  likes: string;
  genre: string[];
  link: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  specialty: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

// --- Data ---

const ROBLOX_GROUP_LINK = "https://www.roblox.com/communities/35746610/Syops-UGC#!/about";

const GAMES_DATA: Game[] = [
  {
    id: '1',
    title: 'Play for UGC',
    description: 'Compete in high-stakes challenges to earn exclusive Syops UGC items directly in-game.',
    thumbnail: '/play_for_ugc.png',
    visits: '12.5M+',
    active: '2.4K',
    likes: '96%',
    genre: ['Earn', 'Action'],
    link: 'https://www.roblox.com/games/131774425311876/Play-for-UGC'
  },
  {
    id: '2',
    title: 'Roll for UGC',
    description: 'Test your luck in this premium RNG experience. Roll for rare statuses and limited edition virtual assets.',
    thumbnail: '/roll_for_ugc.png',
    visits: '8.2M+',
    active: '1.5K',
    likes: '94%',
    genre: ['RNG', 'Simulation'],
    link: 'https://www.roblox.com/games/83343070132643/Roll-for-UGC'
  },
  {
    id: '3',
    title: 'UGC World',
    description: 'The social hub of Syops. Explore a vast world and showcase your collection of exclusive wearables.',
    thumbnail: '/ugc_world.png',
    visits: '5.1M+',
    active: '800',
    likes: '91%',
    genre: ['Social', 'Adventure'],
    link: 'https://www.roblox.com/games/72882283250973/UGC-World'
  }
];

const TEAM: TeamMember[] = [
  { name: 'Ayumi', role: 'Scripter/Developer/UGC Model', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayumi', specialty: 'Full-stack Dev' }
];

const MILESTONES: Milestone[] = [
  { year: '2022', title: 'The Foundation', description: 'Syops UGC was founded by 1 developer with a passion for high-fidelity Roblox games.' },
  { year: '2023', title: '6M Milestone', description: 'Crossed our first 6 million total visits across all experiences.' },
  { year: '2024', title: 'Studio Expansion', description: 'Incubated 4 new indie projects and doubled our core development team.' },
  { year: '2025', title: 'Roblox Innovation Award', description: 'Nominated for Best UGC Creator Group and Most Immersive Experience.' }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Games', href: '#games' },
    { title: 'About', href: '#about' },
    { title: 'Team', href: '#team' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-black/90 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <span className="font-black text-xl italic text-white leading-none">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white uppercase italic">SYOPS <span className="text-blue-400 font-normal not-italic">UGC</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
            >
              {link.title}
            </a>
          ))}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={ROBLOX_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all inline-block"
          >
            JOIN GROUP
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.title} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-white hover:text-brand-cyan transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <a 
                href={ROBLOX_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-blue-600 text-white text-center font-bold rounded-xl"
              >
                JOIN GROUP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BackgroundEffects = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="absolute w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] transition-transform duration-100 ease-out"
        style={{ transform: `translate(${position.x - 400}px, ${position.y - 400}px)` }}
      />
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <motion.div 
    {...animations.fadeInUp}
    whileHover={{ y: -5 }}
    className="glass-card p-6 flex items-center gap-4 group"
  >
    <div className={cn("p-4 rounded-xl group-hover:scale-110 transition-transform", color)}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <h3 className="text-3xl font-black text-white">{value}</h3>
      <p className="text-gray-400 text-sm uppercase tracking-widest">{label}</p>
    </div>
  </motion.div>
);

const GameCard = ({ game }: { game: Game }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      {...animations.scaleIn}
      whileHover={{ 
        y: -10,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.2 }
      }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <div className="dark-card overflow-hidden h-full flex flex-col group-hover:border-blue-500/50 transition-colors">
        <div className="relative aspect-video overflow-hidden">
          {!imgError ? (
            <img 
              src={game.thumbnail} 
              alt={game.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-6 text-center">
              <Gamepad2 className="w-12 h-12 text-white/20 mb-2" />
              <p className="text-white font-black italic uppercase text-xs">Image Preview Unavailable</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
          <div className="absolute top-4 right-4 flex gap-2">
            {game.genre.map(g => (
              <span key={g} className="bg-blue-600 text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-sm text-white">
                {g}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-black mb-1 group-hover:text-blue-400 transition-colors leading-tight">{game.title}</h3>
          <div className="flex justify-between items-center mb-6">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest">{game.visits} Visits</span>
             <span className="text-[10px] text-green-400 font-bold">{game.likes} Like</span>
          </div>
          <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic">{game.description}</p>
          
          <a 
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full py-3 bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all font-bold flex items-center justify-center gap-2 rounded-xl text-xs uppercase tracking-widest"
          >
            PLAY NOW <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan z-[100] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <BackgroundEffects />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-600/30 rounded-full text-blue-400 text-xs font-bold tracking-[0.3em] mb-4 uppercase"
            >
              Leading the Roblox Metaverse
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-9xl font-black text-white leading-tight tracking-tighter uppercase italic"
            >
              Building <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 underline underline-offset-8 decoration-2">Immersive</span> <br/>
              Worlds.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <button className="btn-primary">
                VIEW OUR GAMES
              </button>
              <button className="btn-secondary flex items-center justify-center gap-3">
                JOIN COMMUNITY <Disc className="w-6 h-6" />
              </button>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 opacity-30 h-32"
            >
              <ChevronDown className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <div className="absolute right-[-10%] top-[10%] w-96 h-96 border-[20px] border-white/5 rounded-full rotate-45 pointer-events-none" />
        </section>

        {/* ABOUT & STATS */}
        <section id="about" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div {...animations.fadeInUp}>
                <h2 className="text-5xl font-black text-white mb-8 leading-tight italic">Pioneering the <br/><span className="text-gradient">Metaverse</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed italic">
                  Syops UGC isn't just another dev group. We are a collective of specialized artists and scripters creating professional-grade experiences. From custom engine optimizations to bespoke 3D modeling, we prioritize quality over quantity.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6 mt-12">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-10 h-10 text-blue-500" />
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">Secure Architecture</h4>
                      <p className="text-gray-500 text-xs">Robust anti-exploit and server-authoritative logic.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-10 h-10 text-purple-500" />
                    <div>
                      <h4 className="font-bold text-white uppercase text-sm">Elite Performance</h4>
                      <p className="text-gray-500 text-xs">Targeting 60FPS on low-end mobile devices.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-fit">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Studio Performance</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-4xl font-black text-blue-400">6M+</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Visits</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-purple-400">500K+</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Members</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white">12</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Nominations</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white">4.8</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED GAMES SECTION */}
        <section id="games" className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <motion.div {...animations.fadeInUp}>
                <h2 className="text-5xl font-black text-white mb-4 uppercase italic">OUR <span className="text-blue-400">LOADOUT</span></h2>
                <p className="text-gray-400 max-w-xl italic">A showcase of our most successful experiences, ranging from high-octane simulators to immersive open-world RPGs.</p>
              </motion.div>
              <motion.button 
                whileHover={{ gap: '1rem' }}
                className="text-purple-400 font-bold flex items-center gap-2 group border-b border-purple-400/30 pb-2 uppercase tracking-widest text-xs"
              >
                VIEW ALL GAMES <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GAMES_DATA.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black text-center text-white mb-20 uppercase tracking-widest">Our Evolution</h2>
            
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5" />
              
              <div className="space-y-24">
                {MILESTONES.map((stone, idx) => (
                  <motion.div 
                    key={stone.year}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "flex items-center gap-8 md:gap-20",
                      idx % 2 === 0 ? "flex-row text-right" : "flex-row-reverse text-left"
                    )}
                  >
                    <div className="flex-1 hidden md:block">
                      <div className="glass-card p-8 group hover:border-brand-cyan/50 transition-colors">
                        <h3 className="text-3xl font-black text-white mb-2">{stone.title}</h3>
                        <p className="text-gray-400">{stone.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                      {stone.year}
                    </div>
                    
                    <div className="flex-1 md:hidden">
                       <div className="glass-card p-6">
                        <h3 className="text-2xl font-black text-white mb-2">{stone.title}</h3>
                        <p className="text-gray-400 text-sm">{stone.description}</p>
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2 {...animations.fadeInUp} className="text-5xl font-black text-white mb-4 uppercase">The Core Ops</motion.h2>
            <motion.p {...animations.fadeInUp} className="text-gray-400 max-w-2xl mx-auto mb-16">The specialized talent behind the Syops UGC machinery.</motion.p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  {...animations.scaleIn}
                  whileHover={{ y: -5 }}
                  className="dark-card p-8 group hover:border-blue-500/50 transition-colors"
                >
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[10px] group-hover:blur-[20px] transition-all" />
                    <img src={member.avatar} alt={member.name} className="relative z-10 rounded-full border-2 border-white/10" />
                  </div>
                  <h3 className="text-2xl font-black text-white italic">{member.name}</h3>
                  <p className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-4">{member.role}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-gray-400 uppercase font-black">
                      {member.specialty}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <h2 className="text-4xl font-black text-white mb-16">PLAYER COMMS</h2>
             <div className="grid md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                 <motion.div key={i} className="glass-card p-10 text-left relative">
                   <Star className="text-yellow-500 w-8 h-8 absolute -top-4 -left-2 fill-current" />
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-blue-400 fill-current" />)}
                   </div>
                   <p className="text-gray-300 italic mb-8">"Syops UGC games consistently deliver the most polished UI and gameplay mechanisms I've seen on the platform. Can't wait for their next drop!"</p>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/10" />
                     <div>
                       <p className="text-white font-bold">RobloxPlayer_{i}43</p>
                       <p className="text-gray-500 text-xs">Veteran Gamer</p>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-white/[0.02]">
           <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-4xl font-black text-white mb-12 text-center">FAQ</h2>
              <div className="space-y-4">
                {[
                  { q: "What technologies do you use?", a: "We leverage Roact/Fusion for UI, ProfileService for data, and custom Raycast physics engines for our high-end gameplay." },
                  { q: "Do you hire new developers?", a: "We are always scouting for top-tier scripters and builders. Check our Roblox group recruitment threads for open slots." },
                  { q: "How can I join the community?", a: "Join our official Roblox Group linked above or hit the Discord button in the contact section." }
                ].map((faq, i) => (
                  <details key={i} className="group glass-card overflow-hidden">
                    <summary className="p-6 cursor-pointer flex justify-between items-center list-none focus:outline-none">
                      <span className="font-bold text-white text-lg uppercase italic">{faq.q}</span>
                      <ChevronDown className="w-6 h-6 text-blue-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div 
              {...animations.fadeInUp}
              className="glass-card max-w-4xl mx-auto p-12 md:p-20 relative z-10"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">READY TO <span className="text-gradient">PLAY?</span></h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">Whether you're looking for an internship or want to propose a partnership, our ops team is ready to listen.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-left p-6 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:border-blue-500 transition-colors">
                    <Mail className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Business Inquiries</p>
                      <p className="text-white font-bold">ops@syopsugc.studio</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-left p-6 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:border-purple-500 transition-colors">
                    <Disc className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Community Discord</p>
                      <p className="text-white font-bold">discord.gg/syops</p>
                    </div>
                  </div>
                </div>
                
                <div className="dark-card p-8 space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none text-white transition-colors" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none text-white transition-colors" />
                  <textarea placeholder="Your Transmission..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none text-white transition-colors" />
                  <button className="w-full py-5 bg-blue-600 text-white font-black uppercase text-sm tracking-widest rounded-xl hover:scale-[1.02] transition-transform shadow-[0_4px_20px_rgba(37,99,235,0.3)]">
                    EXECUTE SIGNAL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                   <span className="text-white text-[10px] font-black italic">S</span>
                </div>
                <span className="text-xl font-bold tracking-tighter text-white uppercase italic">SYOPS <span className="text-blue-400 font-normal not-italic lowercase">UGC</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Premium Roblox experiences and UGC assets. Dedicated to performance, immersion, and innovation since 2022.
              </p>
            </div>
            
            {[
              { title: 'Project', links: ['Featured Games', 'UGC Catalog', 'Development Blog'] },
              { title: 'Studio', links: ['About Us', 'Careers', 'Team Culture'] },
              { title: 'Legals', links: ['Privacy Policy', 'Terms of Use', 'Discord Rules'] },
            ].map(col => (
               <div key={col.title}>
                 <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{col.title}</h4>
                 <ul className="space-y-4">
                   {col.links.map(link => (
                     <li key={link}><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">{link}</a></li>
                   ))}
                 </ul>
               </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
            <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest">© 2025 SYOPS UGC STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <Globe className="w-5 h-5 text-gray-500 hover:text-brand-cyan cursor-pointer transition-colors" />
              <Disc className="w-5 h-5 text-gray-500 hover:text-brand-purple cursor-pointer transition-colors" />
              <ExternalLink className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
