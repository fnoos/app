'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FanoosApp() {
  const [openDrawer, setOpenDrawer] = useState<null | 'cat' | 'color'>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(19);
  const [themeColor, setThemeColor] = useState('#10b981');
  const [bgColor, setBgColor] = useState('#f0f9f6');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.style.overflow = openDrawer ? 'hidden' : 'unset';
  }, [openDrawer]);

  const colors = [
    { main: '#ffb38a', bg: '#fff7f2' },
    { main: '#10b981', bg: '#f0f9f6' },
    { main: '#ff718a', bg: '#fff5f6' },
    { main: '#38bdf8', bg: '#f0faff' },
    { main: '#a78bfa', bg: '#f5f3ff' }
  ];

  const categories = ['همه', 'اخلاق', 'حال خوب', 'حکمت', 'نیایش', 'داستان'];

  const postsData = [
    { id: 1, cat: 'اخلاق', tags: ['#صبر', '#ایمان'], text: 'هرگز از <b>راستی</b> نترس، حتی اگر به ضرر تو باشد. چرا که عاقبتِ راستی، آرامشی است که با هیچ دروغی به دست نمی‌آید.', readTime: '۲۰ ثانیه', date: '۱۴۰۵/۰۲/۰۶' },
    { id: 2, cat: 'حکمت', tags: ['#نور', '#راه'], text: 'فانوسِ راهِ دیگران باش؛ اینگونه است که مسیرِ خودت هم همیشه پرنور خواهد ماند و هیچگاه در تاریکی نمی‌مانی.', readTime: '۱۵ ثانیه', date: '۱۴۰۵/۰۲/۰۵' },
    { id: 3, cat: 'حال خوب', tags: ['#امید', '#لبخند'], text: 'امروز یک لبخند به کسی هدیه بده. شاید همین کوچک‌ترین کار، بزرگ‌ترین تغییر در روزِ او و سرنوشت تو باشد.', readTime: '۱۰ ثانیه', date: '۱۴۰۵/۰۲/۰۴' },
    { id: 4, cat: 'داستان', tags: ['#دانش', '#فروتنی'], text: 'عارفی را پرسیدند: از که آموختی؟ گفت: از آن کس که ندانست و گفت نمی‌دانم؛ او بزرگ‌ترین آموزگارِ من در مسیر کمال بود.', readTime: '۲۵ ثانیه', date: '۱۴۰۵/۰۲/۰۳' },
    { id: 5, cat: 'نیایش', tags: ['#دعا', '#آرامش'], text: 'خدایا، در دریای متلاطم زندگی، فانوسِ نگاهت را از ما مگیر که بی‌تو، ما چون کشتی شکسته‌ای در انتظار طوفانیم.', readTime: '۱۸ ثانیه', date: '۱۴۰۵/۰۲/۰۲' }
  ];

  const currentBg = isDarkMode ? '#121212' : bgColor;

  // اصلاح منطق فیلتر
  const filteredPosts = postsData
    .filter(p => !selectedCategory || selectedCategory === 'همه' || p.cat === selectedCategory)
    .filter(p => !selectedTag || p.tags.includes(selectedTag))
    .filter(p => p.text.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(tag => tag.includes(searchQuery)));

  return (
    <main style={{ minHeight: '100vh', backgroundColor: currentBg, transition: '0.4s', direction: 'rtl', fontFamily: '"Vazirmatn", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');
        ::-webkit-scrollbar { display: none; }
        * { font-family: "Vazirmatn", sans-serif !important; }
      `}</style>
      
      {openDrawer && <div onClick={() => setOpenDrawer(null)} style={{ position: 'fixed', inset: 0, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(2px)' }} />}

      <div style={{ padding: '40px 10px 10px', textAlign: 'center' }}>
        <h1 style={{ color: themeColor, fontSize: '48px', fontWeight: '900', margin: 0 }}>فـانـوس</h1>
      </div>

      <div style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '160px', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ position: 'relative' }}>
          <input type="text" placeholder="جستجو در متن یا هشتگ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '18px 25px', borderRadius: '25px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#333', fontSize: '15px', outline: 'none', border: searchQuery ? `2px solid ${themeColor}` : 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', boxSizing: 'border-box' }} />
          {searchQuery && <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: themeColor, fontSize: '22px' }}>×</button>}
        </div>

        {filteredPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} fontSize={fontSize} themeColor={themeColor} isDarkMode={isDarkMode} onTagClick={setSelectedTag} />
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '340px', zIndex: 100 }}>
        <AnimatePresence>
          {openDrawer && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ width: '100%', marginBottom: '12px', backgroundColor: isDarkMode ? '#222' : '#fff', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {openDrawer === 'cat' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {categories.map(cat => (
                    <div key={cat} onClick={() => {setSelectedCategory(cat); setOpenDrawer(null); window.scrollTo(0,0)}} style={{ padding: '12px', textAlign: 'center', borderRadius: '15px', backgroundColor: (selectedCategory === cat || (cat === 'همه' && !selectedCategory)) ? themeColor : 'rgba(128,128,128,0.05)', color: (selectedCategory === cat || (cat === 'همه' && !selectedCategory)) ? '#fff' : (isDarkMode ? '#bbb' : '#555'), fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>{cat}</div>
                  ))}
                </div>
              )}
              {openDrawer === 'color' && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  {colors.map(c => <div key={c.main} onClick={() => {setThemeColor(c.main); setBgColor(c.bg); setOpenDrawer(null)}} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: c.main, cursor: 'pointer' }} />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <nav style={{ backgroundColor: isDarkMode ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.95)', height: '75px', borderRadius: '28px', display: 'flex', alignItems: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div onClick={() => {setSelectedCategory(null); setSelectedTag(null); setOpenDrawer(null); window.scrollTo(0,0)}} style={navItem}><IconHome color={selectedCategory === null && !openDrawer ? themeColor : '#ccc'} /><span style={{...navText, color: selectedCategory === null && !openDrawer ? themeColor : '#999'}}>خانه</span></div>
          <div onClick={() => setOpenDrawer(openDrawer === 'cat' ? null : 'cat')} style={navItem}><IconGrid color={openDrawer === 'cat' || (selectedCategory && selectedCategory !== 'همه') ? themeColor : '#ccc'} /><span style={{...navText, color: openDrawer === 'cat' || (selectedCategory && selectedCategory !== 'همه') ? themeColor : '#999'}}>{selectedCategory && selectedCategory !== 'همه' ? selectedCategory : 'دسته'}</span></div>
          <div onClick={() => setOpenDrawer(openDrawer === 'color' ? null : 'color')} style={navItem}><IconColor color={openDrawer === 'color' ? themeColor : '#ccc'} /><span style={{...navText, color: openDrawer === 'color' ? themeColor : '#999'}}>رنگ</span></div>
          <div onClick={() => setIsDarkMode(!isDarkMode)} style={navItem}>{isDarkMode ? <IconSun /> : <IconMoon />}<span style={navText}>تم</span></div>
          <div onClick={() => setFontSize(fontSize >= 28 ? 16 : fontSize + 3)} style={navItem}><div style={{ width: '30px', height: '30px', backgroundColor: themeColor, borderRadius: '50%', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '900' }}>Aa</div><span style={navText}>سایز</span></div>
        </nav>
      </div>
    </main>
  );
}

function PostCard({ post, index, fontSize, themeColor, isDarkMode, onTagClick }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.article 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', padding: '25px', borderRadius: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <span style={{ color: themeColor, fontWeight: '900', fontSize: '12px' }}>{post.cat}</span>
        <span style={{ color: '#bbb', fontSize: '11px' }}>{post.date}</span>
      </div>
      <p style={{ fontSize: `${fontSize}px`, lineHeight: '1.8', color: isDarkMode ? '#eee' : '#444', textAlign: 'justify', margin: '0 0 15px 0' }} dangerouslySetInnerHTML={{ __html: post.text }} />
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {post.tags.map((tag: string) => (
          <span key={tag} onClick={(e) => { e.stopPropagation(); onTagClick(tag); }} style={{ color: themeColor, fontWeight: '800', fontSize: '13px' }}>{tag}</span>
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid rgba(128,128,128,0.08)', paddingTop: '12px' }}>
        <div style={{ display: 'flex', gap: '18px', opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(10px)', transition: '0.3s ease' }}>
          <button onClick={(e) => {e.stopPropagation(); setLiked(!liked)}} style={{ background: 'none', border: 'none', color: liked ? themeColor : '#ccc', cursor: 'pointer', padding: 0 }}><IconHeart fill={liked} /></button>
          <button onClick={(e) => {e.stopPropagation(); navigator.share?.({text: post.text})}} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', padding: 0 }}><IconShare /></button>
          <button onClick={(e) => {e.stopPropagation(); navigator.clipboard.writeText(post.text)}} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', padding: 0 }}><IconCopy /></button>
        </div>
        <span style={{ color: '#bbb', fontSize: '11px', fontWeight: '700' }}>{post.readTime} مطالعه</span>
      </div>
    </motion.article>
  );
}

const navItem = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '5px', flex: 1, cursor: 'pointer' };
const navText = { fontSize: '12px', fontWeight: '700' };

const IconHome = ({color}: any) => <svg width="24" height="24" fill={color} viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00-.086L12 5.432z" /></svg>;
const IconGrid = ({color}: any) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const IconColor = ({color}: any) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>;
const IconMoon = () => <svg width="24" height="24" fill="#ccc" viewBox="0 0 24 24"><path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" /></svg>;
const IconSun = () => <svg width="24" height="24" fill="none" stroke="#ccc" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>;
const IconHeart = ({fill}: any) => <svg width="20" height="20" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const IconShare = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IconCopy = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>;