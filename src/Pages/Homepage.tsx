import React, { useEffect, useState } from 'react'
import { Chart1, Chart2, Chart3, Chart4, Diskominfo, Geo, OpenData, Square, Square3 } from '../Assets'
import ListVisual from '../Components/ListVisual'
import '../index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const Homepage: React.FC = () => {

  const navigate = useNavigate()

  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);
  const currentYearNow: any = new Date().getFullYear();
  const texts = ['Data', 'Diagram', `${currentYearNow}`];
  const [displayedText, setDisplayedText] = useState(texts[0]);
  const [textIndex, setTextIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    const currentYear: any = new Date().getFullYear();
    setCurrentYear(currentYear)
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textToDisplay = texts[textIndex];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < textToDisplay.length) {
        setDisplayedText(textToDisplay.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [textIndex]);

  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY >= 20) {
              setScrolled(true);
          } else {
              setScrolled(false);
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [scrolled]);

  const handleSelectSidebar = () => {
    setActiveSidebar(false)
  }

  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden bg-slate-800 md:bg-[#0d1117] md:pl-[70px]'>
        
        <div className={`fixed ${activeSidebar ? 'left-0' : 'left-[-100%]'} duration-200 top- w-[80vw] mt-14 z-[44444] md:hidden overflow-hidden h-screen bg-white px-3 py-12 border-r-[2px] border-white`}>
          <ul className='w-full flex flex-col'>
              <a href="#home" onClick={() => handleSelectSidebar()}>
                <li className='border-b border-slate-700 pb-8 w-[100%] hover:text-blue-400 cursor-pointer'>Halaman Utama</li>
              </a>
              <a href="#daftar" onClick={() => handleSelectSidebar()}>
                <li className='border-b border-slate-700 py-8 w-[100%] hover:text-blue-400 cursor-pointer'>Daftar Diagram</li>
              </a>
              <a href="#opendata" onClick={() => handleSelectSidebar()}>
                <li className='border-b border-slate-700 py-8 w-[100%] hover:text-blue-400 cursor-pointer'>Open Data Cirebon</li>
              </a>
              <a href="#geoportal" onClick={() => handleSelectSidebar()}>
                <li className='border-b border-slate-700 py-8 w-[100%] hover:text-blue-400 cursor-pointer'>Geoportal</li>
              </a>
              <a href="#footer" onClick={() => handleSelectSidebar()}>
                <li className='border-b border-slate-700 py-8 w-[100%] hover:text-blue-400 cursor-pointer'>Kontak Dinas</li>
              </a>
            </ul>  
        </div>

        {/* Nabar */}
        <div className='w-[100vw] h-[60px] px-6 bg-white shadow-lg flex md:hidden items-center justify-between fixed top-0 left-0 z-[44444]'>
          <img src={Diskominfo} alt="logo" className='w-[30%]' />
          <div onClick={() => setActiveSidebar(!activeSidebar)} className='relative w-[42px] h-[40px] z-[44444] p-2 border border-slate-700 rounded-[6px] flex flex-col items-center justify-between cursor-pointer active:scale-[0.98]'>
            <div className='w-[90%] h-[2px] bg-slate-700'></div>
            <div className='w-[90%] h-[2px] bg-slate-700'></div>
            <div className='w-[90%] h-[2px] bg-slate-700'></div>
          </div>
        </div>

        <div className={`fixed left-0 top-0 md:inline hidden z-[99999999999] py-[20px] w-[100vw] h-max before:md:absolute before:md:left-[43px] before:md:top-[25px] before:md:bottom-[-5px] before:md:w-[54px] before:md:h-[54px] before:md:bg-[#1976D2] before:md:shadow-lg before:md:shadow-black before:md:content-["<>"] before:md:flex before:md:justify-center before:md:items-center before:md:text-white before:md:font-bold before:md:text-[24px] before:md:rounded-full ${scrolled ? 'bg-[#0d1117]' : 'bg-transparent'}`}>
          <div className='w-full text-slate-300 py-5 hidden md:flex md:pl-[150px] h-[60px]'>
            <ul className='w-max flex items-center justify-between'>
              <a href="#home">
                <li className='mr-3 md:mr-16 hover:text-blue-400 cursor-pointer'>Halaman Utama</li>
              </a>
              <a href="#daftar">
                <li className='mr-3 md:mr-16 hover:text-blue-400 cursor-pointer'>Daftar Diagram</li>
              </a>
              <a href="#opendata">
                <li className='mr-3 md:mr-16 hover:text-blue-400 cursor-pointer'>Open Data Cirebon</li>
              </a>
              <a href="#geoportal">
                <li className='mr-3 md:mr-16 hover:text-blue-400 cursor-pointer'>Geoportal</li>
              </a>
              <a href="#footer">
                <li className='mr-3 md:mr-16 hover:text-blue-400 cursor-pointer'>Kontak Dinas</li>
              </a>
            </ul>
          </div>
        </div>
        {/* Akhir navbar */}
       
        {/* Blur light */}
        <div className='w-[100px] h-[1200px] hidden md:inline bg-blue-800 blur-[160px] rounded-full fixed z-[999999999999] top-[0px] right-0'></div>
        <div className='w-[100px] h-[1200px] hidden md:inline bg-blue-800 blur-[160px] rounded-full fixed z-[999999999999] top-[0px] left-0'></div>
        {/* Akhir Blur light */}
       
        <div id='home' className='relative z-[4444] pl-5 md:px-16 md:pb-[80px] w-[100%] h-max md:border-l-[3px] mt-[120px] md:mt-[90px] md:pt-16 border-white'>
          
          <img src={Chart1} alt="3D" className='absolute hidden md:inline opacity-[0.3] z-[1] top-[-130px] right-[-50px] scale-[0.7]' />
          <img src={Chart3} alt="3D" className='absolute hidden md:inline opacity-[1] z-[1] top-[-110px] right-[25px] scale-[0.4]' />
          <img src={Chart2} alt="3D" className='absolute hidden md:inline opacity-[0.9] z-[1] top-[80px] right-[-50px] scale-[0.4]' />
          <img src={Chart3} alt="3D" className='absolute hidden md:inline opacity-[0.9] z-[1] bottom-[-100px] right-[150px] scale-[0.4]' />
          <img src={Chart4} alt="3D" className='absolute hidden md:inline opacity-[0.5] z-[1] bottom-[-100px] right-[-50px] scale-[0.4]' />
          
          <div className='absolute top-[-70px] right-[40px] md:right-0'>
            <img loading='lazy' src={Square} alt="square" className='absolute w-[100%] nd:top-[0px] top-[-190px] left-[80px] md:left-[-404px] rotate-[0deg]' />
            <img loading='lazy' src={Square} alt="square" className='w-[100%] rotate-[180deg]' />
          </div>

          <div className='w-max md:flex items-center mb-6'>
            <p data-aos='fade-up' className='rounded-full border border-white mt-4 text-center px-5 py-2 w-max text-white flex items-center'>#Visualisasi{currentYear}📊</p>
            <p data-aos='fade-up' className='rounded-full border ml-6 border-white mt-4 text-center px-5 py-2 w-max text-white hidden md:flex items-center'>#SatuDataIndonesia🇮🇩</p>
          </div>
          <h1 id='title-hero-bmw' data-aos='fade-up' className='mt-4 text-[40px] md:text-[80px] w-[90vw] md:w-[80%] font-normal leading-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white'>Open Data Cirebon <span className='md:hidden inline'>2024</span> : <span className='flex'>Visual<span className='md:flex hidden'>isasi</span> {displayedText}</span></h1>
          <div data-aos='fade-up' data-aos-duration="2000" className='w-[80vw] md:w-max flex items-center overflow-hidden rounded-[20px]'>
            <a href='#daftar'>
              <button id="btn-card-destination" className='relative overflow-hidden outline-0 py-5 w-max border-[2px] border-white rounded-[16px] px-12 md:px-28 active:scale-[0.98] brightness-[120%] h-max text-left font-normal bg-blue-600 duration-200 my-7 text-white'>Cari data sekarang 👉</button>
            </a>
          </div>
        </div>

        <div className='mb-20 md:hidden mt-6 border-t-[2px] border-dashed w-screen h-[2px] border-white' />
        
        <ListVisual />

        <div className='mb-5 md:hidden mt-6 border-t-[2px] border-dashed w-screen h-[2px] border-white' />
        
        <div id='opendata' className='relative flex flex-col z-[4444] pt-[140px] md:pt-[160px] w-[100%] h-max md:border-l-[3px] border-white'>
          <div className='relative z-[4444] pb-[0px] pl-6 md:px-16 w-[100%] mt-[0px] top-[-75px] h-max'>
            <div className='w-max mb-7 mt-[-30px] border border-white rounded-full text-white flex items-center text-center px-5 py-2'>
              Informasi pendataan
            </div>
            <h3 data-aos='fade-up' className='text-[26px] md:text-[60px] w-full md:w-[80%] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white font-[500]'>Open Data : Informasi Seputar Kabupaten Cirebon <span className='text-white'>🤓</span></h3>
            <p className='text-[24px] text-white md:w-[70%] mt-8 hidden md:flex items-center'>Di sini Anda bisa akses koleksi data terbuka Kabupaten Cirebon dengan cepat, mudah dan akurat</p>
            <div id='btn-card-destination' onClick={() => window.location.href = 'https://opendata.cirebonkab.go.id'  } className='px-6 md:px-12 py-2 md:py-3 bg-white text-slate-700 w-max shadow-lg rounded-full cursor-pointer hover:brightness-[90%] active:scale-[0.98] mt-7 md:mt-10 flex items-center justify-center relative overflow-hidden duration-200'>
              Kunjungi sekarang 👉
            </div>
          </div>
          <img src={Square3} alt="3D" className='absolute opacity-[0.3] z-[1] top-[-150px] right-[-450px] scale-[0.5]' />
          <div className='w-[88vw] md:w-[92vw] mx-auto md:mx-0 z-40 bg-cover relative bg-blue-800 md:left-[-37px] mt-[-30px] overflow-hidden md:mt-8 rounded-[12px] border border-slate-200 h-[200px] md:h-max'>
            <img src={OpenData} alt="open-data-image" className='brightness-[80%] hover:brightness-[100%] duration-200 h-full w-auto' loading='lazy' />
          </div>
        </div>
        
        <div id='geoportal' className='relative flex flex-col z-[4444] pt-[170px] md:pt-[230px] w-[100%] h-max md:border-l-[3px] border-white'>
          <div className='relative z-[4444] pb-[0px] pl-6 md:px-16 w-[100%] mt-[0px] top-[-75px] h-max'>
            <div className='w-max mb-7 mt-[-30px] border border-white rounded-full text-white flex items-center text-center px-5 py-2'>
              Informasi geospasial
            </div>
            <h3 data-aos='fade-up' className='text-[26px] md:text-[60px] w-full md:w-[80%] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white font-[500]'>Informasi geospasial dalam bentuk GIS <span className='text-white'>🗺️</span></h3>
            <p className='text-[24px] text-white md:w-[70%] mt-8 hidden md:flex items-center'>Geoportal Kota Cirebon merupakan salah satu simpul Jaringan Informasi Geospasial Nasional (JIGN).</p>
            <div id='btn-card-destination' onClick={() => window.location.href = 'http://cirebonkota.ina-sdi.or.id'} className='px-6 md:px-12 py-2 md:py-3 bg-white text-slate-700 w-max shadow-lg rounded-full cursor-pointer hover:brightness-[90%] active:scale-[0.98] mt-7 md:mt-10 flex items-center justify-center relative overflow-hidden duration-200'>
              Kunjungi sekarang 👉
            </div>
          </div>
          <img src={Square3} alt="3D" className='absolute opacity-[0.3] z-[1] top-[-150px] right-[-450px] scale-[0.5]' />
          <div className='w-[88vw] md:w-[92vw] mx-auto md:mx-0 z-40 bg-cover relative bg-blue-600 md:left-[-37px] mt-[-30px] overflow-hidden md:mt-8 rounded-[12px] border border-slate-200 h-[200px] md:h-max'>
            <img src={Geo} alt="open-data-image" className='brightness-[80%] hover:brightness-[100%] duration-200 h-full w-auto' loading='lazy' />
          </div>
        </div>

        <footer id='footer' className='relative w-full text-white pt-16 md:pb-14 md:px-16 before:md:absolute before:md:left-[18px] before:md:mt-2 before:md:w-[54px] before:md:h-[54px] before:md:bg-[#1976D2] before:md:shadow-lg before:md:shadow-black before:md:content-["<>"] before:md:flex before:md:justify-center before:md:items-center before:md:text-white before:md:font-bold before:md:text-[24px] before:md:rounded-full'>
          <div className='md:ml-12' data-aos='fade-left' data-aos-duration="1000">
            <p className='text-[14px] md:text-[16px] ml-6 w-[90vw] md:w-[80%] leading-loose'>Situs website yang menyediakan pelayanan informasi terkait data seputar wilayah kabupaten Cirebon secara visualisasi berubah diagram/chart yang mudah dibaca.</p>
            <div className='flex items-center mt-8'>
              <p className='rounded-full text-black hidden md:inline text-[14px] ml-6 md:ml-7 md:text-[18px] px-4 py-1 text-center bg-gradient-to-r from-white via-slate-400 to-white w-max'>2024 at Diskominfo Kabupaten Cirebon</p>
              <div className='w-max h-[40px] px-5 flex text-black items-center ml-6 bg-gradient-to-r from-white via-slate-400 to-white rounded-full flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-[90%]'>
                <FaPhoneAlt className='cursor-pointer' />
                <p className='ml-3'>(0231) 8330580</p>
              </div>
              <div onClick={() => navigate('https://www.instagram.com/diskominfokabcirebon/')} className='w-[40px] ml-6 bg-slate-400 h-[40px] rounded-full flex items-center justify-center cursor-pointer active:scale-[0.98] hover:brightness-[90%]'>
                <FaInstagram className='cursor-pointer' />
              </div>
            </div>
            <div className='w-screen h-[54px] mt-20 md:hidden text-black px-7 flex items-center text-[14px] md:text-[18px] px-4 py-1 text-center bg-gradient-to-r from-white via-slate-400 to-white'>
              2024 at Diskominfo Kabupaten Cirebon
            </div>
          </div>
        </footer>

    </div>
  )
}

export default Homepage
