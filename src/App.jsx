import React, { useState, useEffect } from 'react';
import { Ghost, Skull, Utensils, BookOpen, Flame, Users, Menu, X, Mail, MessageSquare, Download, Loader2, CheckCircle, PartyPopper } from 'lucide-react';
import { DiscussionEmbed } from 'disqus-react';

// --- GÖRSELLER ---
import bgImage from './assets/mutfak.webp';
import charClown from './assets/char-clown.png';
import charVampire from './assets/char-vampire.png';
import charZombie from './assets/char-zombie.png';
import charGhost from './assets/char-ghost.png';
import charShadow from './assets/char-shadow.png';

// --- KARAKTER VERİLERİ ---
const characters = [
  { id: 1, img: charVampire, name: "Kont Drakula", role: "Kan Gurmesi", story: "Asil duruşuna aldanma. Kanlı kokteylini 1 dakika geciktirirsen, menüdeki 'Taze Boyun Suyu' sen olursun." },
  { id: 2, img: charClown, name: "Bay Kahkaha", role: "Kaotik Palyaço", story: "Sirkten kaçmış olabilir ama açlığı şaka değil. Tatlı göründüğüne bakma, yemeğini beğenmezse son gülen o olur." },
  { id: 3, img: charZombie, name: "Aç Gözlü Zombi", role: "Beyin Avcısı", story: "Beyin salatası için sırada bekliyor. Çok açtır ve sabrı yoktur. Yanlışlıkla kendi parmağını tabağa düşürme." },
  { id: 4, img: charGhost, name: "Sevimli (!) Hayalet", role: "Ruh Emici", story: "Duvarlardan geçip mutfağına sızabilir. Görünmez olduğuna güvenme, ruhunu emmeden önce yemeğini soğutmayı sever." },
  { id: 5, img: charShadow, name: "Gölge Varlık", role: "Bilinmeyen Tehlike", story: "Ne olduğu bilinmiyor, sadece açlığı biliniyor. Karanlıkta bekler ve siparişi yanlış gelirse seni de karanlığa çeker." }
];

// --- TARİF VERİLERİ ---
const recipes = [
  { category: "BASLANGICLAR & CORBALAR", items: [{ name: "Göz Küresi Çorbası", ingredients: "2 Göz Küresi + 1 Kara Yosun + 3 Pıhtılaşmış Kan" }, { name: "Kan Gölü Sosu", ingredients: "2 Parlak Kan + 3 Keskin Kemik + 1 Baharat" }, { name: "Kertenkele Kuyruğu", ingredients: "4 Kertenkele Kuyruğu + 1 İtihap Tozu + 2 Diş" }, { name: "Kurtçuk Kanepesi", ingredients: "4 Kurtçuk + 2 Küflü Ekmek + 1 Bilinmeyen Yağ" }] },
  { category: "ANA YEMEKLER (MAIN COURSE)", items: [{ name: "Izgara Canavar Kalbi", ingredients: "1 Et (Pişmiş) + 4 Kara Zehir" }, { name: "Zombi Beyin Keki", ingredients: "1 Beyin + 2 Kan Tüpü + 2 Yosun + 1 Kurukafa" }, { name: "Ucube Pizza", ingredients: "2 Küflü Ekmek + 1 İtihap Tozu + 2 Böcek Yumurtası" }, { name: "Dokunaç Yahnisi", ingredients: "4 Dokunaç + 1 Kara Zehir + 2 Kanayan Patates" }] },
  { category: "YAN LEZZETLER (SIDE DISH)", items: [{ name: "Kesik Damar Spagettisi", ingredients: "2 Siyah Spagetti + 1 Parlak Kan Tüpü" }, { name: "Zehirli Mantar Sepeti", ingredients: "2 Mantar + 1 Asit + 3 Kemik Parçası" }, { name: "Beyin Salatası", ingredients: "1 Beyin + 1 Balçık + 2 Kertenkele Kuyruğu" }, { name: "Örümcek Yumurtaları", ingredients: "1 Örümcek + 2 Böcek Yumurtası + 1 Pıhtılaşmış Kan" }] },
  { category: "TATLILAR & ICECEKLER", items: [{ name: "Kanlı Şırıngalar", ingredients: "4 Şırınga + 1 Parlak Kan Tüpü" }, { name: "Çürük Diş Pastası", ingredients: "4 Çürük Diş + 2 Kurabiye" }, { name: "Kusmuk Şekeri", ingredients: "2 Asit + 1 Bilinmeyen Yağ + 4 Kırmızı Şeker" }, { name: "Saf Kan Kokteyli", ingredients: "9 Parlak Kan + 44 Kesme Şeker (Kırmızı)" }] }
];

// --- DEMO TALEP MODAL BİLEŞENİ (GELİŞMİŞ VERSİYON) ---
function DemoRequestModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Kapanma animasyonu için state

  const GOOGLE_DEMO_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd-xc0DiAQbJsN5PuD1zOYXagT1DbqoqAkR-41B7ldji73KFw/formResponse"; 
  const demo_ADSOYAD = "entry.447931260"; 
  const demo_YAS = "entry.609294600";
  const demo_TEL = "entry.628219843";
  const demo_EMAIL = "entry.744323919";

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  // Kapanma Fonksiyonu: Önce animasyonu oynatır, sonra kapatır
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400); // 400ms animasyon süresi kadar bekle
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Container: isClosing true ise 'animate-slide-out', değilse 'animate-slide-in' */}
      <div className={`relative w-full max-w-lg bg-gray-950 border border-neon-green/50 rounded-2xl p-8 shadow-[0_0_60px_rgba(57,255,20,0.15)] ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
        
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition hover:rotate-90 duration-300"><X size={28} /></button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <h3 className="text-3xl font-horror text-neon-green mb-2 tracking-wide drop-shadow-md">DEMO TALEP ET</h3>
              <p className="text-gray-400 text-sm">Aramıza katılmaya cesaretin var mı? <br/>Bilgilerini bırak, sıran gelince seni çağıracağız.</p>
            </div>
            <iframe name="hidden_demo_iframe" id="hidden_demo_iframe" style={{display: 'none'}} onLoad={() => {}}></iframe>
            <form action={GOOGLE_DEMO_ACTION_URL} method="POST" target="hidden_demo_iframe" onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-neon-green text-[10px] font-bold mb-1 tracking-[0.2em] group-focus-within:text-white transition-colors">AD SOYAD</label>
                <input type="text" name={demo_ADSOYAD} className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:bg-gray-900 transition-all duration-300 placeholder-gray-600" placeholder="Adınız..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-neon-green text-[10px] font-bold mb-1 tracking-[0.2em] group-focus-within:text-white transition-colors">YAS</label>
                  <input type="text" name={demo_YAS} className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:bg-gray-900 transition-all duration-300 placeholder-gray-600" placeholder="Yaşınız..." />
                </div>
                <div className="group">
                  <label className="block text-neon-green text-[10px] font-bold mb-1 tracking-[0.2em] group-focus-within:text-white transition-colors">TELEFON</label>
                  <input type="tel" name={demo_TEL} className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:bg-gray-900 transition-all duration-300 placeholder-gray-600" placeholder="05..." />
                </div>
              </div>
              <div className="group">
                <label className="block text-neon-green text-[10px] font-bold mb-1 tracking-[0.2em] group-focus-within:text-white transition-colors">E-POSTA ADRESI <span className="text-red-500">*</span></label>
                <input type="email" name={demo_EMAIL} required className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:bg-gray-900 transition-all duration-300 placeholder-gray-600" placeholder="ornek@email.com" />
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center gap-3 font-bold text-xl py-4 rounded transition-all duration-300 mt-6 ${isSubmitting ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700' : 'bg-neon-green text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]'}`}>{isSubmitting ? <><Loader2 className="animate-spin-slow" size={24} /> GÖNDERİLİYOR...</> : "TALEBI GONDER"}</button>
            </form>
          </>
        ) : (
          /* --- GÜZELLEŞTİRİLMİŞ BAŞARILI EKRANI --- */
          <div className="text-center py-8 animate-fade-in flex flex-col items-center justify-center relative overflow-hidden">
            {/* Arka plan efekti */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none"></div>
            
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-6 border-2 border-neon-green shadow-[0_0_30px_rgba(57,255,20,0.5)] animate-bounce-slow z-10">
               <PartyPopper className="text-neon-green w-12 h-12" />
            </div>
            
            <h4 className="text-4xl font-horror text-white mb-4 drop-shadow-[0_0_10px_rgba(57,255,20,0.8)] z-10">Talebin Alindi!</h4>
            
            <div className="bg-gray-900/80 p-4 rounded-lg border border-gray-800 mb-6 max-w-xs z-10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Aramıza hoş geldin. Demo hazır olduğunda, verdiğin mail adresine <span className="text-neon-green font-bold">özel erişim linkini</span> göndereceğiz.
                </p>
            </div>

            <button 
              onClick={handleClose} 
              className="px-10 py-3 bg-neon-green text-black rounded font-bold tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)] z-10"
            >
              HARİKA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- İLETİŞİM FORMU ---
function CustomForm() {
  const [submitted, setSubmitted] = useState(false);
  const GOOGLE_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScL_rnULAULONLh4HHErm1bH1PlSvUQOPDAwf8pyxowIVcNYQ/formResponse";
  const entry_AD = "entry.1738217772";
  const entry_MAIL = "entry.124233123";
  const entry_PUAN = "entry.791899184";
  const entry_TARIF = "entry.125698084"; 
  const entry_HATA = "entry.396713294"; 

  if (submitted) {
    return (
      <div className="text-center py-20 animate-fade-in border-2 border-neon-green/50 rounded-2xl bg-black/50">
        <h4 className="text-4xl font-horror text-neon-green mb-4 drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">MESAJIN ALINDI!</h4>
        <p className="text-gray-300 text-xl">Karanlık mutfağımıza katkın için teşekkürler...</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-gray-500 hover:text-white underline">Yeni bir kurban (mesaj) daha gönder</button>
      </div>
    );
  }

  return (
    <>
      <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}} onLoad={() => {}}></iframe>
      <form action={GOOGLE_ACTION_URL} method="POST" target="hidden_iframe" onSubmit={() => { setTimeout(() => setSubmitted(true), 1000); }} className="space-y-6 text-left">
        <div className="grid md:grid-cols-2 gap-6">
          <div><label className="block text-neon-green font-bold mb-2 font-mono text-sm tracking-widest">ADIN (VEYA RUHUN?)</label><input type="text" name={entry_AD} required placeholder="Drakula..." className="w-full bg-gray-900/80 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all" /></div>
          <div><label className="block text-neon-green font-bold mb-2 font-mono text-sm tracking-widest">MEZAR ADRESIN (MAIL)</label><input type="email" name={entry_MAIL} required placeholder="ornek@mezar.com" className="w-full bg-gray-900/80 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all" /></div>
        </div>
        <div><label className="block text-neon-green font-bold mb-3 font-mono text-sm tracking-widest">MUTFAGIMIZI PUANLA</label><div className="flex justify-between items-center bg-gray-900/80 p-4 rounded border border-gray-700"><span className="text-xs text-gray-500 hidden md:block">MİDEM BULANDI (1)</span><div className="flex gap-4 md:gap-8 mx-auto md:mx-0">{[1, 2, 3, 4, 5].map((num) => (<label key={num} className="cursor-pointer flex flex-col items-center group"><input type="radio" name={entry_PUAN} value={num} required className="peer sr-only" /><div className="w-6 h-6 rounded-full border-2 border-gray-600 peer-checked:bg-neon-green peer-checked:border-neon-green transition-all group-hover:border-neon-green group-hover:scale-110"></div><span className="text-xs mt-2 text-gray-500 peer-checked:text-neon-green font-bold">{num}</span></label>))}</div><span className="text-xs text-gray-500 hidden md:block">PARMAKLARIMI YEDİM (5)</span></div></div>
        <div><label className="block text-neon-green font-bold mb-2 font-mono text-sm tracking-widest">IGRENC TARIF ONERIN (Malzeme)</label><textarea name={entry_TARIF} rows="3" placeholder="Göz küresi çorbası..." className="w-full bg-gray-900/80 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"></textarea></div>
        <div><label className="block text-neon-green font-bold mb-2 font-mono text-sm tracking-widest">VARSA HATALI DURUM (Bug)</label><textarea name={entry_HATA} rows="2" placeholder="Oyun şurada çöktü..." className="w-full bg-gray-900/80 border border-gray-700 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"></textarea></div>
        <button type="submit" className="w-full bg-neon-green text-black font-horror text-2xl py-4 rounded hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.5)] mt-4">GÖNDER</button>
      </form>
    </>
  );
}

// --- ANA UYGULAMA ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const disqusShortname = "tasteoffear"; 
  const disqusConfig = {
    url: "http://localhost:3000", 
    identifier: "main-forum-thread",
    title: "Taste of Fear Topluluk Tartışması",
    language: 'tr' 
  };

  return (
    <div className="min-h-screen text-gray-200 font-tech selection:bg-neon-green selection:text-black relative overflow-x-hidden z-0">
      
      {isDemoModalOpen && (
        <DemoRequestModal onClose={() => setIsDemoModalOpen(false)} />
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src={bgImage} alt="Dark Kitchen" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-black"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full border-b border-neon-green/20 bg-gray-950/80 backdrop-blur-md z-50 py-4 transition-all duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-neon-green font-horror tracking-widest cursor-pointer hover:text-white transition drop-shadow-[0_0_10px_rgba(57,255,20,0.8)] z-50">TASTE OF FEAR</h1>
          
          <ul className="hidden md:flex items-center space-x-8 text-sm font-bold">
            <li><a href="#game" className="nav-link group hover:text-neon-green transition-all">OYUN</a></li>
            <li><a href="#characters" className="nav-link group hover:text-neon-green transition-all">KARAKTERLER</a></li>
            <li><a href="#menu" className="nav-link group hover:text-neon-green transition-all">MENU</a></li>
            <li><a href="#contact" className="nav-link group hover:text-neon-green transition-all">ILETISIM</a></li>
            <li><a href="#forum" className="nav-link group hover:text-neon-green transition-all">FORUM</a></li>
            <li>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="ml-4 px-6 py-2 border-2 border-neon-green text-neon-green rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] font-horror tracking-widest"
              >
                DEMO TALEP ET
              </button>
            </li>
          </ul>

          <div className="md:hidden z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-neon-green transition">{isMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center space-y-8 text-2xl font-horror z-40 animate-fade-in-down">
              <a href="#game" onClick={closeMenu} className="hover:text-neon-green transition-colors">OYUN</a>
              <a href="#characters" onClick={closeMenu} className="hover:text-neon-green transition-colors">KARAKTERLER</a>
              <a href="#menu" onClick={closeMenu} className="hover:text-neon-green transition-colors">MENU</a>
              <a href="#contact" onClick={closeMenu} className="hover:text-neon-green transition-colors">ILETISIM</a>
              <a href="#forum" onClick={closeMenu} className="hover:text-neon-green transition-colors">FORUM</a>
              <button 
                onClick={() => { setIsDemoModalOpen(true); closeMenu(); }}
                className="mt-6 px-8 py-3 border-2 border-neon-green text-neon-green rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 font-horror text-xl"
              >
                DEMO TALEP ET
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="game" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-green/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <h2 className="text-6xl md:text-9xl font-horror text-transparent bg-clip-text bg-gradient-to-b from-neon-green to-green-900 mb-6 drop-shadow-[0_0_25px_rgba(57,255,20,0.5)] animate-bounce-slow leading-tight">TASTE OF FEAR</h2>
        <p className="text-lg md:text-3xl max-w-3xl text-gray-100 mb-10 border-l-8 border-neon-green pl-6 font-bold shadow-black drop-shadow-lg text-left md:text-center">"Midem doldu ama ruhum hala aç..." <br /><span className="text-neon-green text-base md:text-lg font-normal block mt-2">Yanlış malzemeyi seçersen, kazandaki sonraki et sen olursun.</span></p>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto px-4">
          
          {/* BUTON DÜZELTİLDİ: justify-center eklendi (Mobilde ortalama için) */}
          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="relative w-full md:w-auto px-8 py-4 bg-neon-green text-black font-horror text-xl md:text-2xl rounded overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(57,255,20,0.6)] flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2"><Download size={24}/> DEMO TALEP ET</span>
            <div className="absolute inset-0 bg-white/50 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>
          
          <a href="#menu" className="w-full md:w-auto px-8 py-4 border-2 border-neon-green text-neon-green font-horror text-lg md:text-xl rounded hover:bg-neon-green hover:text-black transition-all duration-300 flex justify-center items-center gap-3 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"><BookOpen size={24} /> MENUYE BAK</a>
          <a href="#forum" className="w-full md:w-auto px-8 py-4 border-2 border-gray-500 text-gray-300 font-horror text-lg md:text-xl rounded hover:border-white hover:text-white transition-all duration-300 flex justify-center items-center gap-3 bg-black/40 hover:bg-black/80"><MessageSquare size={24} /> FORUMA KATIL</a>
        </div>
      </section>

      {/* --- CHARACTERS SECTION --- */}
      <section id="characters" className="py-40 relative z-10 bg-gray-950/80 backdrop-blur-md border-y border-neon-green/20 overflow-visible">
        <div className="container mx-auto px-4">
          <div className="text-center mb-40">
            <h3 className="text-4xl md:text-6xl font-horror text-white mb-6 inline-flex items-center gap-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"><Users className="text-neon-green animate-pulse" size={48} /> KARANLIK MUSTERILER</h3>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto pb-4 border-b-2 border-neon-green/30">Bu mutfağın müdavimleri biraz... farklı.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-24"> 
            {characters.map((char) => (
              <div key={char.id} className="group relative w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-[380px] bg-gray-900 border border-gray-700 hover:border-neon-green rounded-3xl transition-all duration-300 mt-16 hover:shadow-[0_0_50px_rgba(57,255,20,0.4)] transform-gpu will-change-transform backface-hidden">
                <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ clipPath: 'inset(-500px -50px 10px -50px)' }}>
                  <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
                     <div className="absolute top-24 w-48 h-48 bg-neon-green/10 rounded-full blur-2xl -z-10 transform-gpu"></div>
                     <img src={char.img} alt={char.name} loading="lazy" className="h-[550px] w-auto max-w-none object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,1)] filter brightness-[0.8] transform-gpu" />
                  </div>
                </div>
                <div className="relative pt-52 pb-6 px-4 text-center z-10 rounded-3xl overflow-hidden transform-gpu">
                  <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black via-black/90 to-transparent -z-10"></div>
                  <h4 className="text-3xl md:text-4xl font-horror text-neon-green mb-0 tracking-wider drop-shadow-lg">{char.name}</h4>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block border-b border-gray-700/50 pb-1 mx-auto w-1/2">{char.role}</span>
                  <p className="text-gray-300 font-mono text-xs leading-tight drop-shadow-md px-2">{char.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-horror text-white mb-4 inline-flex items-center gap-4 drop-shadow-md"><Flame className="text-neon-green animate-pulse" size={48} /> LANETLI TARIFLER</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Mutfaktaki kadim kitaptan sızan yasaklı formüller.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {recipes.map((cat, index) => (
              <div key={index} className="bg-gray-950/60 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10 hover:border-neon-green hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] transition-all duration-500 group">
                <h4 className="text-2xl md:text-3xl font-horror text-neon-green mb-6 border-b border-gray-700 pb-3 flex justify-between items-center">{cat.category}<Utensils size={24} className="text-gray-500 group-hover:text-neon-green transition-colors" /></h4>
                <ul className="space-y-5">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex flex-col group/item">
                      <span className="font-bold text-lg md:text-xl text-gray-200 group-hover/item:text-neon-green transition-colors duration-300">{item.name}</span>
                      <span className="text-sm text-gray-400 font-mono mt-1 pl-3 border-l-2 border-gray-600 group-hover/item:border-neon-green transition-all">{item.ingredients}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEEDBACK FORM --- */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-950/80 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-neon-green/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="text-center mb-10">
              <h3 className="text-4xl md:text-5xl font-horror text-neon-green mb-3 drop-shadow-lg">GELISTIRICIYE FISILDA</h3>
              <p className="text-gray-400 text-lg">Yeni bir iğrenç tarif önerin veya bulduğun bir hatayı bildir.</p>
            </div>
            <CustomForm />
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-20 bg-gray-950/80 backdrop-blur-sm border-y border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
             {[
               { icon: <Skull size={64} />, title: "OLUMCUL MUSTERILER", desc: "Vampirler bahşiş bırakmaz, hayatını alır." },
               { icon: <Utensils size={64} />, title: "IGRENC MALZEMELER", desc: "Göz küresi, yaratık kaburgası ve dahası." },
               { icon: <Ghost size={64} />, title: "KARANLIK ATMOSFER", desc: "Her köşede seni izleyen bir şeyler var." }
             ].map((feat, i) => (
               <div key={i} className="p-6 rounded-lg hover:bg-white/5 transition duration-500 group">
                  <div className="text-gray-600 group-hover:text-neon-green transition-colors duration-300 mb-6 flex justify-center group-hover:scale-110 transform">
                    {feat.icon}
                  </div>
                  <h4 className="text-2xl font-horror mb-3 text-white">{feat.title}</h4>
                  <p className="text-gray-400">{feat.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- FORUM SECTION --- */}
      <section id="forum" className="py-24 bg-gray-950/90 backdrop-blur-md border-t border-neon-green/20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-horror text-white mb-4 inline-flex items-center gap-4 drop-shadow-md"><MessageSquare className="text-neon-green animate-pulse" size={48} /> OLUMCUL TARTISMALAR</h3>
            <p className="text-gray-400 text-lg">Diğer aşçılarla konuş, tariflerini paylaş veya lanetli sırlar hakkında dedikodu yap.</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-neon-green/20 shadow-[0_0_40px_rgba(57,255,20,0.1)]">
             <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black text-center border-t border-gray-800 text-gray-600 text-xs font-tech tracking-widest relative z-10">
        <p>&copy; 2025 TASTE OF FEAR. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default App;