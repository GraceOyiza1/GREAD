import React, { useState, useEffect } from 'react'

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('top');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "pub_b688b102f4f84e56aa2cab94ed7ebf85";
  const topics = ['top', 'technology', 'entertainment', 'business', 'health'];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=gh&category=${category}`
        );
        const data = await response.json();
        if (data.results) setArticles(data.results);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  // --- RESTORED: CLEAN FULL-PAGE READER VIEW ---
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button onClick={() => setSelectedArticle(null)} className="text-sm font-black text-[#aa3bff] uppercase tracking-tighter">← Back to News</button>
            <div className="text-2xl font-black tracking-tighter text-[#aa3bff]">GREAD</div>
            <div className="w-10"></div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#aa3bff] font-black text-xs uppercase tracking-widest">{selectedArticle.source_id}</span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-gray-400 text-xs font-medium">{new Date(selectedArticle.pubDate).toDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">{selectedArticle.title}</h1>

          {selectedArticle.image_url && (
            <img src={selectedArticle.image_url} className="w-full h-[450px] object-cover rounded-xl mb-12 shadow-2xl" alt="" />
          )}

          <div className="text-xl leading-relaxed text-gray-700 space-y-8">
            <p className="font-bold text-2xl text-black border-l-4 border-[#aa3bff] pl-6 italic">
              {selectedArticle.description}
            </p>
            {/* We display the content here so it stays inside your design */}
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#aa3bff] first-letter:mr-3 first-letter:float-left">
              {selectedArticle.content || selectedArticle.description}
            </p>
            <p>Stay tuned to GREAD for more updates as this story develops.</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] font-sans antialiased">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-black tracking-tighter text-[#aa3bff]">GREAD</div>
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#" className="text-black underline decoration-[#aa3bff] decoration-2 underline-offset-4">Home</a>
            <a href="#" className="hover:text-black">Pulse Edition</a>
            <a href="#" className="hover:text-black">About</a>
          </nav>
          <button className="px-5 py-2 text-[10px] font-black border-2 border-black rounded-full uppercase">Sign In</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {loading ? (
          <div className="h-96 flex items-center justify-center font-black uppercase text-xs tracking-widest animate-pulse">Loading Pulse Feed...</div>
        ) : (
          <>
            {/* --- HERO GRID (PULSE STYLE) --- */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div
                className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-2xl shadow-xl h-[500px]"
                onClick={() => setSelectedArticle(articles[0])}
              >
                <img src={articles[0]?.image_url || "https://images.unsplash.com/photo-1504711434969-e33886168f5c"} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
                  <span className="bg-[#aa3bff] w-fit px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">Top Story</span>
                  <h1 className="text-4xl font-black leading-tight mb-4">{articles[0]?.title}</h1>
                  <p className="text-gray-300 line-clamp-2">{articles[0]?.description}</p>
                </div>
              </div>

              {/* Trending Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-xl font-black border-b-4 border-black pb-1 inline-block uppercase italic italic tracking-tighter">Trending Now</h2>
                <div className="space-y-6 pt-2">
                  {articles.slice(1, 5).map((item, index) => (
                    <div key={index} className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0" onClick={() => setSelectedArticle(item)}>
                      <span className="text-4xl font-black text-gray-100 group-hover:text-[#aa3bff] italic transition-colors">0{index + 1}</span>
                      <p className="text-sm font-black leading-tight hover:underline">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- CATEGORY SELECTOR --- */}
            <div className="flex flex-wrap gap-2 justify-center border-y border-gray-100 py-6">
              {topics.map(t => (
                <button key={t} onClick={() => setCategory(t)} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full border-2 ${category === t ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-black'}`}>{t}</button>
              ))}
            </div>

            {/* --- LATEST FEED --- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {articles.slice(5).map((article, idx) => (
                <div key={idx} onClick={() => setSelectedArticle(article)} className="group cursor-pointer flex flex-col">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gray-100 border border-gray-100">
                    <img src={article.image_url || "https://images.unsplash.com/photo-1585829365234-781f8c4267b5"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <span className="text-[#aa3bff] font-black text-[10px] uppercase mb-2">{article.source_id}</span>
                  <h3 className="text-lg font-black leading-tight group-hover:text-[#aa3bff] mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{article.description}</p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* --- RESTORED: INITIAL DEEP FOOTER (PULSE STYLE) --- */}
        <footer className="bg-[#0c0c0c] text-white -mx-6 px-10 py-20 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-6">
              <div className="text-4xl font-black tracking-tighter text-[#aa3bff]">GREAD</div>
              <p className="text-xs text-gray-500 font-medium leading-loose">Built for high-performance reading and modern editorial excellence. Ghana's premier content hub [2026].</p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white mb-8 border-b border-white/10 pb-2">Navigation</h4>
              <ul className="text-[11px] space-y-4 font-black uppercase tracking-widest text-gray-500">
                <li className="hover:text-[#aa3bff] cursor-pointer">Entertainment</li>
                <li className="hover:text-[#aa3bff] cursor-pointer">Lifestyle</li>
                <li className="hover:text-[#aa3bff] cursor-pointer">Technology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white mb-8 border-b border-white/10 pb-2">Connect</h4>
              <ul className="text-[11px] space-y-4 font-black uppercase tracking-widest text-gray-500">
                <li className="hover:text-white cursor-pointer">LinkedIn</li>
                <li className="hover:text-white cursor-pointer">Instagram</li>
                <li className="hover:text-white cursor-pointer">TikTok</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white mb-8 border-b border-white/10 pb-2">Regional</h4>
              <p className="text-[11px] font-black uppercase text-gray-500 hover:text-white cursor-pointer">Ghana Edition</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">© 2026 GREAD AFRICA. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App