'use client'

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function FanoosApp() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState<null | 'cat' | 'color' | 'about'>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(19);
  const [themeColor, setThemeColor] = useState('#10b981'); 
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState('');
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['همه']);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });
      if (!error && data) {
        setPosts(data);
        const uniqueCats = Array.from(new Set(data.map((p: any) => p.category).filter(Boolean)));
        setDynamicCategories(['همه', ...uniqueCats as string[]]);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openDrawer]);

  const colors = ['#a78bfa', '#38bdf8', '#fb7185', '#10b981', '#ffb088'];
  
  const cleanText = (text: string) => 
    text?.replace(/[\u064B-\u065F\u0640\u0610-\u061A]/g, "") 
        .replace(/‌/g, " ") 
        .replace(/ی/g, 'ی').replace(/ک/g, 'ک')
        .trim() || '';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
    setSelectedCategory('همه');
    setOpenDrawer(null);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const postCat = cleanText(p.category);
      const targetCat = cleanText(selectedCategory);
      
      if (searchQuery !== '') {
        return p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
               (p.hashtags && p.hashtags.includes(searchQuery));
      }
      
      return selectedCategory === 'همه' || postCat === targetCat;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: isDarkMode ? '#121212' : `${themeColor}05`, 
      transition: '0.4s', 
      direction: 'rtl' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');
        ::-webkit-scrollbar { display: none; }
        * { font-family: "Vazirmatn", sans-serif !important; -webkit-tap-highlight-color: transparent; }
        .post-card .interactive-icons { opacity: 0; transition: 0.3s; }
        .post-card:hover .interactive-icons, .post-card:active .interactive-icons { opacity: 1; }
        .hashtag-link { color: ${themeColor}; text-decoration: none; font-weight: 800; cursor: pointer; }
        .copy-feedback { position: fixed; background: #333; color: #fff; padding: 6px 12px; border-radius: 10px; font-size: 12px; z-index: 1000; pointer-events: none; transition: 0.4s; }
        .fade-out { opacity: 0; transform: translateY(-10px); }
        .social-icon { transition: 0.3s; display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50%; }
        .social-icon img { transition: 0.3s; filter: ${isDarkMode ? 'invert(1)' : 'none'}; }
        .social-icon:active { background-color: ${themeColor}; transform: scale(0.9); }
        .social-icon:active img { filter: ${isDarkMode ? 'brightness(0)' : 'brightness(0) invert(1)'}; }
      `}</style>
      
      <AnimatePresence>
        {(openDrawer && openDrawer !== 'about') && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setOpenDrawer(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 90, backdropFilter: 'blur(2px)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDrawer === 'about' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 200, backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}
            onClick={() => setOpenDrawer(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', 
                borderRadius: '40px', 
                padding: '30px 25px', 
                maxWidth: '380px', 
                width: '100%', 
                height: 'auto', 
                textAlign: 'center', 
                boxShadow: '0 25px 70px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ textAlign: 'right', direction: 'rtl' }}>
                <h2 style={{ color: themeColor, fontWeight: '900', fontSize: '24px', marginBottom: '15px', textAlign: 'center' }}>درباره فانوس</h2>
                <strong style={{ fontSize: '18px', display: 'block', marginBottom: '10px', fontWeight: '900', color: themeColor }}>فانوس | رفیقِ شب‌های تردید 🌙</strong>
                
                <div style={{ color: isDarkMode ? '#eee' : '#333', lineHeight: '1.7', fontSize: '15px', textAlign: 'justify' }}>
                  <p style={{ margin: '0 0 10px 0' }}>
                    همه ما شب‌هایی را داشته‌ایم که سوالات مثل خوره به جانمان افتاده‌اند. اینجا نه قرار است نصیحت بشنوی و نه قرار است با کلماتِ سنگین محاصره شوی. ما فقط فانوسی را بالا گرفته‌ایم تا در کنار هم، راه را از بیراهه، و حقیقت را از نمایش‌های ساختگی تشخیص دهیم.
                  </p>
                  <p style={{ margin: '0 0 10px 0' }}>
                    قلبِ تو بزرگ‌تر از آن است که در قفسِ «پوچی» بماند.
                  </p>
                  <p style={{ margin: '0' }}>
                    بیا با هم، از نو شروع کنیم. 🤍
                  </p>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', borderTop: isDarkMode ? '1px solid #333' : '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
                  <a href="https://t.me/fanoosarea" target="_blank" rel="noreferrer" className="social-icon"><IconTelegram /></a>
                  <a href="https://instagram.com/fanoosarea" target="_blank" rel="noreferrer" className="social-icon"><IconInsta /></a>
                  <a href="https://tiktok.com/@fanoosarea" target="_blank" rel="noreferrer" className="social-icon"><IconTiktok /></a>
                </div>
                <button onClick={() => setOpenDrawer(null)} style={{ backgroundColor: themeColor, color: '#fff', border: 'none', padding: '12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', width: '100%' }}>بستن پنجره</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ padding: '40px 10px 10px', textAlign: 'center', position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
        <div 
          onClick={() => setOpenDrawer('about')}
          style={{ position: 'absolute', left: '15px', top: '50px', width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
        >
          <IconSmile themeColor={themeColor} />
        </div>
        <h1 style={{ color: themeColor, fontSize: '48px', fontWeight: '900', margin: 0 }}>فـانـوس</h1>
      </div>

      <div style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '160px', maxWidth: '480px', margin: '0 auto' }}>
        <input 
          type="text" 
          placeholder="جستجو در فانوس..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: '100%', padding: '18px 25px', borderRadius: '25px', backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#333', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', boxSizing: 'border-box', outline: 'none' }} 
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: themeColor }}>در حال روشن کردن فانوس‌ها...</div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} fontSize={fontSize} themeColor={themeColor} isDarkMode={isDarkMode} setSearchQuery={setSearchQuery} />
          ))
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '350px', zIndex: 100 }}>
        <AnimatePresence>
          {openDrawer === 'cat' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ width: '100%', marginBottom: '12px', backgroundColor: isDarkMode ? '#222' : '#fff', borderRadius: '25px', padding: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {dynamicCategories.map(cat => (
                  <div key={cat} onClick={() => {
                    setSelectedCategory(cat); 
                    setSearchQuery('');
                    setOpenDrawer(null);
                  }} style={{ padding: '12px', textAlign: 'center', borderRadius: '15px', backgroundColor: selectedCategory === cat ? themeColor : 'rgba(128,128,128,0.05)', color: selectedCategory === cat ? '#fff' : (isDarkMode ? '#bbb' : '#555'), fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>{cat}</div>
                ))}
              </div>
            </motion.div>
          )}

          {openDrawer === 'color' && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ width: 'fit-content', marginBottom: '12px', backgroundColor: isDarkMode ? '#222' : '#fff', borderRadius: '25px', padding: '15px 20px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
                {colors.map(c => (
                  <div key={c} onClick={() => {setThemeColor(c); setOpenDrawer(null)}} style={{ width: '45px', height: '45px', borderRadius: '15px', backgroundColor: c, cursor: 'pointer', border: themeColor === c ? (isDarkMode ? '3px solid #fff' : '3px solid #333') : 'none', flexShrink: 0 }} />
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <nav style={{ backgroundColor: isDarkMode ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.95)', height: '75px', borderRadius: '28px', display: 'flex', alignItems: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
          <div onClick={scrollToTop} style={navItem}><IconHome color={(selectedCategory === 'همه' && searchQuery === '') ? themeColor : '#999'} /><span style={{...navText, color: (selectedCategory === 'همه' && searchQuery === '') ? themeColor : '#999'}}>خانه</span></div>
          <div onClick={() => setOpenDrawer(openDrawer === 'cat' ? null : 'cat')} style={navItem}><IconGrid color={(openDrawer === 'cat' || (selectedCategory !== 'همه' && searchQuery === '')) ? themeColor : '#999'} /><span style={{...navText, color: (openDrawer === 'cat' || (selectedCategory !== 'همه' && searchQuery === '')) ? themeColor : '#999'}}>دسته</span></div>
          <div onClick={() => setOpenDrawer(openDrawer === 'color' ? null : 'color')} style={navItem}><IconColor color={openDrawer === 'color' ? themeColor : '#999'} /><span style={{...navText, color: openDrawer === 'color' ? themeColor : '#999'}}>رنگ</span></div>
          <div onClick={() => setIsDarkMode(!isDarkMode)} style={navItem}>{isDarkMode ? <IconSun /> : <IconMoon />}<span style={{...navText, color: '#999'}}>تم</span></div>
          <div onClick={() => setFontSize(fontSize >= 28 ? 16 : fontSize + 3)} style={navItem}><div style={{ width: '28px', height: '28px', backgroundColor: themeColor, borderRadius: '50%', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: '900' }}>Aa</div><span style={{...navText, color: '#999'}}>سایز</span></div>
        </nav>
      </div>
    </main>
  );
}

function PostCard({ post, fontSize, themeColor, isDarkMode, setSearchQuery }: any) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes_count || 0);

  const readingTimeText = useMemo(() => {
    const words = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const seconds = Math.max(3, Math.ceil(words * 0.8));
    return seconds < 60 ? `${seconds} ثانیه مطالعه` : `${Math.ceil(seconds / 60)} دقیقه مطالعه`;
  }, [post.content]);

  useEffect(() => {
    if (localStorage.getItem(`liked_${post.id}`)) setLiked(true);
  }, [post.id]);

  const handleLike = async (e: any) => {
    e.stopPropagation();
    if (liked) return;
    setLikes(likes + 1); setLiked(true);
    localStorage.setItem(`liked_${post.id}`, 'true');
    await supabase.from('posts').update({ likes_count: likes + 1 }).eq('id', post.id);
  };

  const handleShare = async (e: any) => {
    e.stopPropagation();
    const plainText = post.content.replace(/<[^>]*>/g, '').trim();
    const shareMessage = `${plainText}\n\n✨ فـانـوس\n---------------------------\nهمراه ما باشید در:\n\nتلگــــرام: t.me/fanoosarea\nاینستــــا: instagram.com/fanoosarea\nتیک تاک: tiktok.com/@fanoosarea\nســــایت: https://fa.fanos.workers.dev`;
    try {
      await navigator.clipboard.writeText(shareMessage);
      showFeedback(e);
    } catch (err) {}
    if (navigator.share) {
      try {
        await navigator.share({ title: "", text: shareMessage });
      } catch (err) {}
    }
  };

  const showFeedback = (event: any) => {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.innerText = 'متن کپی و آماده ارسال شد';
    feedback.style.left = `${event.clientX}px`;
    feedback.style.top = `${event.clientY - 40}px`;
    document.body.appendChild(feedback);
    setTimeout(() => {
      feedback.classList.add('fade-out');
      setTimeout(() => feedback.remove(), 400);
    }, 1000);
  };

  const renderHashtags = (tags: string) => {
    if (!tags) return null;
    return tags.split(' ').filter(t => t.trim() !== "").map((tag, i) => (
      <span key={i} className="hashtag-link" onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSearchQuery(tag);
      }} style={{ marginLeft: '8px' }}>
        {tag.startsWith('#') ? tag : `#${tag}`}
      </span>
    ));
  };

  return (
    <motion.article className="post-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', padding: '25px', borderRadius: '35px', border: isDarkMode ? '1px solid #333' : '1px solid #f0f0f0', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
        <span style={{ backgroundColor: `${themeColor}15`, color: themeColor, padding: '5px 12px', borderRadius: '12px', fontWeight: '900', fontSize: '11px' }}>{post.category}</span>
        <span style={{ color: '#bbb', fontSize: '11px' }}>{post.date}</span>
      </div>
      <p style={{ fontSize: `${fontSize}px`, lineHeight: '1.8', color: isDarkMode ? '#eee' : '#444', textAlign: 'justify', textJustify: 'inter-word', whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: post.content }} />
      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>{renderHashtags(post.hashtags)}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', borderTop: '1px solid rgba(128,128,128,0.08)', paddingTop: '15px' }}>
        <div className="interactive-icons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: liked ? 'default' : 'pointer' }} onClick={handleLike}>
            <IconHeart fill={liked} color={liked ? themeColor : '#ccc'} />
            <span style={{ fontSize: '14px', color: liked ? themeColor : '#bbb', fontWeight: 'bold' }}>{likes}</span>
          </div>
          <div onClick={handleShare} style={{cursor: 'pointer'}}><IconShare /></div>
        </div>
        <span style={{ color: '#bbb', fontSize: '11px', fontWeight: '500' }}>{readingTimeText}</span>
      </div>
    </motion.article>
  );
}

const navItem = { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '5px', flex: 1, cursor: 'pointer' };
const navText = { fontSize: '12px', fontWeight: '700' };
const IconHome = ({color}: any) => <svg width="24" height="24" fill={color} viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00-.086L12 5.432z" /></svg>;
const IconGrid = ({color}: any) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const IconMoon = () => <svg width="24" height="24" fill="#999" viewBox="0 0 24 24"><path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" /></svg>;
const IconSun = () => <svg width="24" height="24" fill="none" stroke="#999" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>;
const IconHeart = ({fill, color}: any) => <svg width="20" height="20" fill={fill ? color : "none"} stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>;
const IconShare = () => <svg width="20" height="20" fill="none" stroke="#ccc" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IconColor = ({color}: any) => (
  <svg width="26" height="26" fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
  </svg>
);
const IconSmile = ({themeColor}: any) => (
  <div style={{ width: '28px', height: '28px', backgroundColor: themeColor, WebkitMaskImage: 'url("/smile.svg")', maskImage: 'url("/smile.svg")', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
);
const IconTelegram = () => <img src="/tel.svg" alt="Telegram" width="28" height="28" />;
const IconInsta = () => <img src="/insta.svg" alt="Instagram" width="28" height="28" />;
const IconTiktok = () => <img src="/tik.svg" alt="Tiktok" width="28" height="28" />;