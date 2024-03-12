import React, { useEffect, useState } from 'react'
import { SquareLine } from '../Assets'
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa'
import API from '../Services'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ListVisual: React.FC = () => {

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
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    
    });
    
    const [search, setSearch] = useState<string>('')
    const [dataVisual, setDataVisual] = useState<any[]>([])


    useEffect(() => {
        (async () => {
            const response = await API.getAllVisual()
            console.log(response?.data?.data)
            setDataVisual(response?.data?.data)
        })()
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 14;

    const filteredData = dataVisual?.filter((data: any) => {
        if (search && search !== '') {
            return data?.title.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleClickNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

  return (
    <div id='daftar' className='relative flex flex-col z-[4444] pt-[20px] md:pt-[80px] pb-[0px] w-[100%] h-max md:border-l-[3px] border-white'>
        <img src={SquareLine} alt="3D" className='absolute opacity-[0.3] z-[1] top-[-150px] right-[-420px] scale-[0.5]' />
        <div className='relative z-[4444] pb-[0px] px-6 md:px-16 w-[100%] mt-[0px] top-[-45px] h-max'>
            <div data-aos='fade-up' className='w-max mb-3 border border-white rounded-full text-white flex items-center text-center px-5 py-2'>
                Informasi sekilas
            </div>
            <h3 data-aos='fade-up' data-aos-duration='1000' className='text-[32px] md:text-[70px] text-white md:text-blue-500 font-[500]'>Daftar diagram <span className='md:inline hidden'>📊</span></h3>
            <h2 data-aos='fade-up' data-aos-duration='2000' className='text-[20px] md:text-[30px] text-white w-max hidden md:flex items-center'>Temukan informasi secara mudah by <span className='text-blue-500 ml-3 flex items-center'>diskominfo cirebon.</span></h2>
        </div>

        <form className='md:ml-16 mt-[-20px] md:mt-12 flex items-center'>
            <input 
                type="text" 
                name='search' 
                placeholder='Ketikan judul data disini...'
                value={search} 
                onChange={(e: any) => {
                    setSearch(e.target.value)
                }} 
                className='border-0 outline-0 px-3 py-4 w-[80vw] md:w-[50vw] rounded-[14px] ml-6 md:ml-0 left-0'
            />
            <div className='w-[54px] h-[54px] ml-6 rounded-full hidden md:flex items-center justify-center cursor-pointer z-[4444] hover:brightness-[90%] active:scale-[0.97] shadow-md bg-white text-slate-700'>
                <FaSearch />
            </div>
        </form>
        
        <div className='w-[100vw] bg-white md:bg-transparent pb-6 pt-14 md:pt-1 md:w-[86vw] flex z-40 flex flex-wrap justify-between relative md:pl-12 mt-[60px] h-max'>
            {filteredData
                    ?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    ?.map((data: any, index: number) => (
                        <div key={index} className='w-[88vw] mx-auto md:w-[47%] mb-8 md:mb-10 bg-white md:bg-slate-800 h-[max] px-5 py-4 md:p-8 border-[2px] border-slate-700 md:border-white rounded-[20px]'>
                        <div className='w-full md:w-[90%] h-max relative flex flex-col justify-between text-[20px] leading-loose text-white'>
                            <h3 className='w-full md:w-[110%] text-[16px] md:text-[18px] text-slate-700 md:text-white overflow-hidden overflow-ellipsis max-w-[95%] whitespace-nowrap'>{data?.title}</h3>
                            <div className='w-[100%] h-[160px] md:h-[220px] rounded-[10px] bg-slate-600 border-[3px] border-slate-800 md:border-white mt-5 overflow-hidden flex justify-center items-center'>
                                <img src={data?.image} loading='lazy' alt="thumbnail" className='w-full h-auto rounded-[10px]' />
                            </div>
                            <div className='w-full flex flex-col mt-6 justify-between'>
                                <Link target='__blank' to={data?.link}>
                                    <h3 className='cursor-pointer rounded-[10px] text-[15px] md:text-[18px] w-max px-4 md:px-1 py-2 mb-4 bg-slate-800 md:bg-transparent hover:brightness-[90%] active:scale-[0.99] text-white md:text-blue-400 flex items-center'>Cek sekarang <FaArrowRight className='ml-4 relative top-[0.8]' /> </h3>
                                </Link>
                                <small className='max-w-full md:ml-1 overflow-hidden md:inline hidden overflow-ellipsis whitespace-nowrap'><b>Uploader</b> : {data?.uploader}</small>
                            </div>
                        </div>
                    </div>
                ))}
                {totalPages > 1 && (
                    <div className="flex w-full justify-between md:justify-end px-6 md:pr-6 md:mt-4 md:mb-0 mb-16">
                        <button
                            className={`bg-blue-500 flex items-center text-white font-bold py-4 px-4 rounded ${currentPage === 0 ? 'cursor-not-allowed opacity-50 bg-slate-500' : 'cursor-pointer hover:bg-blue-700'}`}
                            onClick={handleClickPrev}
                            disabled={currentPage === 0}
                        >
                            <FaArrowLeft className='mr-3 cursor-pointer' />
                        </button>
                        <span className="text-white font-bold mx-4 flex items-center md:px-4">
                            <p className='md:inline hidden'>Page</p> {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            className={`bg-blue-500 flex items-center text-white font-bold py-4 px-4 rounded ${currentPage === totalPages - 1 ? 'cursor-not-allowed opacity-50 bg-slate-500' : 'cursor-pointer hover:bg-blue-700'}`}
                            onClick={handleClickNext}
                            disabled={currentPage === totalPages - 1}
                        >
                            <FaArrowRight className='ml-3 cursor-pointer' />
                        </button>
                    </div>
                )}
        </div>
    </div>
  )
}

export default ListVisual
