import React, { useState, useEffect } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('top');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // Mobile Menu State

  const sections = ['News', 'Entertainment', 'Lifestyle', 'Sports'];
  const API_KEY = "pub_b688b102f4f84e56aa2cab94ed7ebf85";

  const fetchNews = async (query = '', isSearch = false) => {
    setLoading(true);
    setMenuOpen(false); // Close menu on fetch
    try {
      const baseUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=gh`;
      const finalUrl = isSearch
        ? `${baseUrl}&q=${encodeURIComponent(query)}`
        : `${baseUrl}&category=${category.toLowerCase() === 'news' ? 'top' : category.toLowerCase()}`;

      const response = await fetch(finalUrl);
      const data = await response.json();
      if (data.results) setArticles(data.results);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      fetchNews(searchQuery, true);
    }
  };

  // --- RESPONSIVE READER VIEW ---
  if (selectedArticle) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#0c0c0c] text-white' : 'bg-[#dce9ff] text-[#1a1a1a]'} font-sans`}>
        <header className={`border-b ${darkMode ? 'border-white/10 bg-[#0c0c0c]' : 'bg-white border-gray-100'} px-4 py-4 sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button onClick={() => setSelectedArticle(null)} className="text-xs font-black text-[#aa3bff] uppercase tracking-[0.2em]">← Back</button>
            <div className="text-xl md:text-2xl font-black tracking-tighter text-[#aa3bff]">GREAD</div>
            <div className="w-10"></div>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#aa3bff] text-white px-3 py-1 text-[10px] font-black uppercase">{selectedArticle.source_id}</span>
            <span className="text-gray-400 text-[10px] md:text-xs">{new Date(selectedArticle.pubDate).toDateString()}</span>
          </div>
          <h1 className={`text-3xl md:text-6xl font-black leading-tight mb-8 tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>{selectedArticle.title}</h1>
          {selectedArticle.image_url && <img src={selectedArticle.image_url} className="w-full h-[250px] md:h-[500px] object-cover rounded-2xl mb-8 md:mb-12 shadow-2xl" alt="" />}
          <div className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed space-y-6 md:space-y-8 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            <p className={`font-bold text-xl md:text-2xl italic border-l-4 md:border-l-8 border-[#aa3bff] pl-4 md:pl-8 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>{selectedArticle.description}</p>
            <p className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left">{selectedArticle.content || selectedArticle.description}</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0c0c0c] text-white' : 'bg-[#dce9ff] text-[#1a1a1a]'} font-sans antialiased`}>

      {/* --- RESPONSIVE HEADER --- */}
      <header className={`${darkMode ? 'bg-[#0c0c0c] border-white/10' : 'bg-white border-gray-100'} border-b px-4 md:px-6 py-4 sticky top-0 z-50 transition-colors`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">

          {/* Logo */}
          <div className="text-3xl md:text-4xl font-black tracking-tighter text-[#aa3bff] cursor-pointer" onClick={() => setCategory('top')}>GREAD</div>

          {/* Search (Hidden on small mobile, shown on md up) */}
          <div className="hidden md:flex items-center gap-2 max-w-xs lg:max-w-sm flex-1 mx-4 lg:mx-10 relative">
            <span className="absolute left-4 text-gray-400 text-xs">🔍</span>
            <input
              type="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className={`w-full pl-10 pr-4 py-2 rounded-full text-xs outline-none border ${darkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#aa3bff]' : 'bg-gray-50 border-gray-200 focus:border-[#aa3bff]'}`}
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
            {sections.map(s => (
              <button key={s} onClick={() => { setCategory(s); window.scrollTo(0, 0) }} className={`hover:text-[#aa3bff] transition-colors ${category === s ? 'text-[#aa3bff]' : 'text-gray-400'}`}>{s}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)} className={`w-10 h-5 md:w-12 md:h-6 rounded-full relative transition-all ${darkMode ? 'bg-[#aa3bff]' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 md:top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${darkMode ? 'left-5 md:left-7' : 'left-1'}`} />
            </button>

            {/* Mobile Menu Toggle */}
            <button className="xl:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>

            <div className="hidden md:flex w-8 h-8 bg-black rounded-full items-center justify-center text-white text-[10px] font-bold cursor-pointer hover:bg-[#aa3bff] border border-white/20">GO</div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className={`xl:hidden absolute left-0 w-full p-6 space-y-6 shadow-2xl border-b ${darkMode ? 'bg-[#0c0c0c] border-white/10' : 'bg-white border-gray-100'}`}>
            <div className="relative">
              <span className="absolute left-4 top-2 text-gray-400">🔍</span>
              <input
                type="search"
                placeholder="Search..."
                onKeyDown={handleSearch}
                className={`w-full pl-10 pr-4 py-3 rounded-full text-sm outline-none border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50'}`}
              />
            </div>
            <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest">
              {sections.map(s => (
                <button key={s} onClick={() => setCategory(s)} className="text-left py-2 border-b border-gray-100/10">{s}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-12 md:space-y-20">

        {loading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-t-4 border-[#aa3bff] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* --- RESPONSIVE HERO & TRENDING --- */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pt-4 items-start">
              <div
                className="lg:col-span-8 group cursor-pointer relative h-[350px] md:h-[600px] overflow-hidden rounded-3xl shadow-xl"
                onClick={() => setSelectedArticle(articles[0])}
              >
                <img src={articles[0]?.image_url || "https://images.unsplash.com/photo-1495020689067-958852a7765e"} alt="" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#aa3bff] px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded text-white">Featured</div>
              </div>

              {/* Sidebar with bold purple numbers - Now stacks on mobile */}
              <div className="lg:col-span-4 flex flex-col space-y-8 md:space-y-12 px-2 md:pl-6">
                {articles.slice(1, 5).map((item, index) => (
                  <div key={index} className="flex items-start gap-6 md:gap-8 group cursor-pointer" onClick={() => setSelectedArticle(item)}>
                    <span className="text-4xl md:text-5xl font-black text-[#aa3bff] leading-none">0{index + 2}</span>
                    <div className="flex-1 space-y-1 md:space-y-2">
                      <span className="text-[9px] md:text-[10px] font-black text-[#aa3bff] uppercase tracking-wider">{item.source_id.toUpperCase()}</span>
                      <p className={`text-sm md:text-base font-black leading-snug group-hover:text-[#aa3bff] transition-colors line-clamp-2 ${darkMode ? 'text-white' : 'text-black'}`}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- RESPONSIVE LONG SCROLL SECTIONS --- */}
            {sections.map((sec) => (
              <section key={sec} className={`space-y-8 md:space-y-10 border-t pt-12 md:pt-16 ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic border-l-[8px] md:border-l-[12px] border-[#aa3bff] pl-4 md:pl-6">{sec}</h2>
                  <button onClick={() => setCategory(sec)} className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#aa3bff]">View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                  {articles.slice(5, 8).map((article, idx) => (
                    <div key={idx} onClick={() => setSelectedArticle(article)} className="group cursor-pointer">
                      <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 md:mb-6 shadow-lg border-2 md:border-4 transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-white'}`}>
                        <img src={article.image_url || "https://images.unsplash.com/photo-1585829365234-781f8c4267b5"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                      </div>
                      <h3 className={`text-base md:text-xl font-black leading-tight group-hover:text-[#aa3bff] transition-colors line-clamp-3 ${darkMode ? 'text-white' : 'text-black'}`}>{article.title}</h3>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* --- RESPONSIVE DEEP FOOTER --- */}
            <footer className={`${darkMode ? 'bg-white text-black' : 'bg-[#0c0c0c] text-white'} -mx-4 md:-mx-6 px-6 md:px-10 py-16 md:py-24 mt-20 transition-colors`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
                <div className="space-y-6">
                  <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#aa3bff]">GREAD</div>
                  <p className={`text-xs md:text-sm font-medium leading-loose ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                    Ghana’s digital pulse. High-performance news built in Accra.
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 opacity-30">Channels</h4>
                  <ul className="text-[10px] md:text-xs space-y-4 md:space-y-5 font-black uppercase tracking-widest">
                    {sections.map(s => (
                      <li key={s} onClick={() => { setCategory(s); window.scrollTo(0, 0) }} className="hover:text-[#aa3bff] cursor-pointer transition-colors">{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 opacity-30">Connect</h4>
                  <ul className="text-[10px] md:text-xs space-y-4 md:space-y-5 font-black uppercase tracking-widest">
                    <li>LinkedIn</li>
                    <li>Instagram</li>
                    <li>TikTok</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 md:mb-10 opacity-30">Legal</h4>
                  <ul className={`text-[10px] md:text-xs space-y-4 md:space-y-5 font-black uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>Terms</li>
                    <li>Privacy</li>
                  </ul>
                </div>
              </div>

              <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] opacity-20 text-center">© 2026 GREAD AFRICA • ACCRA</p>
                <div className="flex gap-4">
                  <div className="w-8 h-8 border border-current opacity-20 rounded-full flex items-center justify-center text-[8px] font-black">GH</div>
                  <div className="w-8 h-8 border border-current opacity-20 rounded-full flex items-center justify-center text-[8px] font-black">NG</div>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}

export default App;