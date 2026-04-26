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
  const [searchQuery, setSearchQuery] = useState(''); // وضعیت جدید برای جستجو

  // قفل کردن اسکرول صفحه اصلی
  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openDrawer]);

  const colors = [
    { main: '#ffb38a', bg: '#fff7f2' },
    { main: '#10b981', bg: '#f0f9f6' },
    { main: '#ff718a', bg: '#fff5f6' },
    { main: '#38bdf8', bg: '#f0faff' },
    { main: '#a78bfa', bg: '#f5f3ff' }
  ];

  const categories = ['همه', 'چرا؟', 'اخلاق', 'حال خوب', 'عمومی', 'حکمت', 'نیایش', 'تأمل', 'داستان', 'شعر', 'نکته'];

  const postsData = [
    { id: 1, cat: 'اخلاق', tags: ['#صبر', '#ایمان'], text: 'هرگز از <b>راستی</b> نترس، حتی اگر به ضرر تو باشد. چرا که عاقبتِ راستی، آرامشی است که با هیچ دروغی به دست نمی‌آید.', readTime: '۲۰ ثانیه', date: '۱۴۰۵/۰۲/۰۶' },
    { id: 2, cat: 'حکمت', tags: ['#نور', '#راه'], text: 'فانوسِ راهِ دیگران باش؛ اینگونه است که مسیرِ خودت هم همیشه پرنور خواهد ماند.', readTime: '۱۵ ثانیه', date: '۱۴۰۵/۰۲/۰۵' },
    { id: 3, cat: 'حال خوب', tags: ['#امید', '#لبخند'], text: 'امروز یک لبخند به کسی هدیه بده. شاید همین کوچک‌ترین کار، بزرگ‌ترین تغییر در روزِ او باشد.', readTime: '۱۰ ثانیه', date: '۱۴۰۵/۰۲/۰۴' },
    { id: 4, cat: 'داستان', tags: ['#دانش', '#فروتنی'], text: 'عارفی را پرسیدند: از که آموختی؟ گفت: از آن کس که ندانست و گفت نمی‌دانم؛ او بزرگ‌ترین آموزگارِ من بود.', readTime: '۲۵ ثانیه', date: '۱۴۰۵/۰۲/۰۳' },
    { id: 5, cat: 'نیایش', tags: ['#دعا', '#آرامش'], text: 'خدایا، در دریای متلاطم زندگی، فانوسِ نگاهت را از ما مگیر که بی‌تو، گم‌گشته‌ای بیش نیستیم.', readTime: '۱۸ ثانیه', date: '۱۴۰۵/۰۲/۰۲' }
  ];

  const currentBg = isDarkMode ? '#121212' : bgColor;

  // منطق فیلتر کردن پست‌ها
  const filteredPosts = postsData
    .filter(p => !selectedCategory || selectedCategory === 'همه' || p.cat === selectedCategory)
    .filter(p => !selectedTag || p.tags.includes(selectedTag))
    .filter(p => 
      p.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <main style={{ 
      minHeight: '100vh', backgroundColor: currentBg, transition: '0.4s', direction: 'rtl', 
      fontFamily: '"Vazirmatn", sans-serif'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;900&display=swap');
        ::-webkit-scrollbar { display: none; }
      `}</style>
      
      {openDrawer && <div onClick={() => setOpenDrawer(null)} style={{ position: 'fixed', inset: 0, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(2px)' }} />}

      <div style={{ padding: '40px 20px 10px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: '"Vazirmatn", sans-serif', color: themeColor, fontSize: '45px', fontWeight: '900', margin: 0 }}>فـانـوس</h1>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '160px', maxWidth: '500px', margin: '0 auto' }}>
        
        {/* بخش جستجو */}
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <input 
            type="text"
            placeholder="جستجو در متن یا هشتگ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '22px',
              border: 'none',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
              color: isDarkMode ? '#fff' : '#333',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none',
              boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.03)',
              border: searchQuery ? `1.5px solid ${themeColor}` : '1.5px solid transparent',
              transition: '0.3s'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: themeColor, cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              ×
            </button>
          )}
        </div>

        {/* نوار وضعیت فیلتر هشتگ */}
        <AnimatePresence>
          {selectedTag && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', padding: '10px 20px', borderRadius: '20px', border: `1px solid ${themeColor}44`, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: themeColor }}>موضوع: {selectedTag}</span>
              <button onClick={() => setSelectedTag(null)} style={{ background: 'none', border: 'none', color: themeColor, cursor: 'pointer', fontWeight: '900', fontSize: '16px' }}>×</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* لیست پست‌ها */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              index={index} 
              fontSize={fontSize} 
              themeColor={themeColor} 
              isDarkMode={isDarkMode} 
              onTagClick={(tag: string) => {setSelectedTag(tag); window.scrollTo({ top: 0, behavior: 'smooth' });}}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '14px' }}>نتیجه‌ای یافت نشد...</div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '85%', maxWidth: '380px', zIndex: 20 }}>
        
        {/* دراورها */}
        <div style={{ 
          width: '280px', margin: '0 auto 15px', 
          backgroundColor: isDarkMode ? 'rgba(34, 34, 34, 0.95)' : 'rgba(255, 255, 255, 0.98)', 
          backdropFilter: 'blur(25px)', borderRadius: '30px', 
          padding: openDrawer ? '20px 20px 10px' : '0', 
          maxHeight: openDrawer ? '260px' : '0', 
          overflowY: 'auto', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)', opacity: openDrawer ? 1 : 0,
          transform: openDrawer ? 'translateY(0)' : 'translateY(30px)', transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          visibility: openDrawer ? 'visible' : 'hidden', border: '1px solid rgba(255,255,255,0.2)',
          zIndex: 30, scrollbarWidth: 'none'
        }}>
          {openDrawer === 'cat' && (
            <>
              <div style={{ textAlign: 'center', color: themeColor, fontWeight: '800', fontSize: '13px', marginBottom: '15px', position: 'sticky', top: 0, backgroundColor: isDarkMode ? '#222' : '#fff', padding: '5px 0', zIndex: 2 }}>
                انتخاب موضوع
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingBottom: '20px' }}>
                {categories.map((item) => (
                  <div key={item} 
                    onClick={() => {
                      setSelectedCategory(item); 
                      setSelectedTag(null);
                      setSearchQuery('');
                      setActiveTab(item === 'همه' ? 'home' : 'cat'); 
                      setOpenDrawer(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    style={{ 
                      padding: '12px', textAlign: 'center', borderRadius: '15px', 
                      backgroundColor: selectedCategory === item ? themeColor : (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'), 
                      color: selectedCategory === item ? '#fff' : (isDarkMode ? '#bbb' : '#555'), 
                      fontSize: '13px', cursor: 'pointer', fontWeight: '700', transition: '0.2s' 
                    }}>
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}
          
          {openDrawer === 'color' && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', padding: '10px 0 20px' }}>
              {colors.map(c => (
                <div key={c.main} onClick={() => {setThemeColor(c.main); setBgColor(c.bg); setActiveTab('color'); setOpenDrawer(null)}} 
                  style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: c.main, cursor: 'pointer', transition: '0.3s' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* نوار منو */}
        <nav style={{ 
          backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.4)' : 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(20px)', height: '80px', borderRadius: '25px', display: 'flex', 
          justifyContent: 'space-around', alignItems: 'center', padding: '0 10px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.2)', width: '100%'
        }}>
          <div onClick={() => { setActiveTab('home'); setSelectedCategory(null); setSelectedTag(null); setSearchQuery(''); setOpenDrawer(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ ...navItem, color: activeTab === 'home' ? themeColor : '#ccc' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00-.086L12 5.432z" /></svg>
            <span style={{...navText, color: activeTab === 'home' ? themeColor : '#888'}}>خانه</span>
          </div>
          
          <div onClick={() => setOpenDrawer(openDrawer === 'cat' ? null : 'cat')} style={{ ...navItem, color: (activeTab === 'cat' || openDrawer === 'cat') ? themeColor : '#ccc' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" /></svg>
            <span style={{...navText, color: (activeTab === 'cat' || openDrawer === 'cat') ? themeColor : '#888'}}>{selectedCategory && selectedCategory !== 'همه' ? selectedCategory : 'دسته'}</span>
          </div>

          <div onClick={() => setOpenDrawer(openDrawer === 'color' ? null : 'color')} style={{ ...navItem, color: (activeTab === 'color' || openDrawer === 'color') ? themeColor : '#ccc' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
            <span style={{...navText, color: (activeTab === 'color' || openDrawer === 'color') ? themeColor : '#888'}}>رنگ</span>
          </div>

          <div onClick={() => {setIsDarkMode(!isDarkMode); setOpenDrawer(null)}} style={{ ...navItem }}>
            {isDarkMode ? <svg width="24" height="24" fill="none" stroke="#ccc" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="#ccc"><path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" /></svg>}
            <span style={{...navText, color: '#888'}}>تم</span>
          </div>

          <div onClick={() => {setFontSize(fontSize >= 28 ? 16 : fontSize + 3); setOpenDrawer(null)}} style={{ ...navItem }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: themeColor, borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '900' }}>Aa</div>
            <span style={{...navText, color: '#888'}}>سایز</span>
          </div>
        </nav>
      </div>
    </main>
  );
}

function PostCard({ post, index, fontSize, themeColor, isDarkMode, onTagClick }: any) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: isDarkMode ? '#1e1e1e' : 'white', padding: '25px', borderRadius: '30px', position: 'relative', overflow: 'hidden',
        border: isDarkMode ? '1px solid #333' : '1px solid rgba(0,0,0,0.02)',
        boxShadow: isDarkMode ? '0 8px 30px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.04)', transition: '0.3s'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <span style={{ backgroundColor: themeColor, color: 'white', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: '900' }}>{post.cat}</span>
        <span style={{ color: '#aaa', fontSize: '11px', fontWeight: '500' }}>{post.date}</span>
      </div>

      <p style={{ fontSize: `${fontSize}px`, lineHeight: '1.8', color: isDarkMode ? '#ddd' : '#444', textAlign: 'justify', margin: '0 0 15px 0' }} dangerouslySetInnerHTML={{ __html: post.text }} />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {post.tags?.map((tag: string) => (
          <span key={tag} onClick={() => onTagClick(tag)} style={{ fontSize: '13px', color: themeColor, fontWeight: '800', cursor: 'pointer', transition: '0.2s', opacity: 0.8 }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: isDarkMode ? '1px solid #333' : '1px solid #f5f5f5', marginTop: '10px', paddingTop: '10px' }}>
        <div style={{ display: 'flex', gap: '22px', opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <button onClick={() => setIsLiked(!isLiked)} style={{ ...btnStyle, color: isLiked ? themeColor : '#ccc' }}>
             <svg width="20" height="20" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
          <button onClick={() => navigator.share && navigator.share({text: post.text})} style={{ ...btnStyle, color: '#ccc' }}>
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button onClick={() => navigator.clipboard.writeText(post.text)} style={{ ...btnStyle, color: '#ccc' }}>
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
        <span style={{ color: '#aaa', fontSize: '10px', fontWeight: '700', opacity: isHovered ? 1 : 0.6, transition: '0.3s' }}>{post.readTime} مطالعه</span>
      </div>
    </motion.article>
  );
}

const btnStyle = { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: '0.2s' };
const navItem = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '5px', cursor: 'pointer', flex: 1, transition: '0.3s' };
const navText = { fontSize: '10px', fontWeight: '800' };