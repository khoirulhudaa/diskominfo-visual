import AOS from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SquareLine } from '../Assets'
import API from '../Services'

const ListVisual: React.FC = () => {

    const [dinas, setDinas] = useState<any[]>([])
    const [type_dinas, setType_dinas] = useState<string>('')

    useEffect(() => {
        (async () => {
            const response = await API.getAllDinas()
            console.log(response)
            const transformData = (dataArray: any) => {
                // Transform the data array into an array of new objects
                const transformedArray = dataArray.map((item: any) => ({ label: item.dinas_name, value: item.dinas_name }));
               
                // Add an object with label and value at the beginning of the array
                transformedArray.unshift({ label: "Semua dinas", value: "", disabled: true  });
               
                return transformedArray;
            };
               
            // Use the function to transform the data
            const newObjects = transformData(response?.data?.data);
            setDinas(newObjects)
        })()
    }, [])

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
        <div className='relative z-[4444] pb-[0px] px-5 md:px-16 w-[100%] mt-[0px] top-[-45px] h-max'>
            <div className='w-max mb-3 border border-white rounded-full text-white flex items-center text-center px-5 py-2'>
                Informasi sekilas
            </div>
            <h3 data-aos='fade-up' data-aos-duration='1000' className='text-[32px] md:text-[70px] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-white font-[500]'>Daftar diagram <span className='md:inline hidden text-white'>📊</span></h3>
            <h2 data-aos='fade-up' data-aos-duration='2000' className='text-[20px] md:text-[30px] text-white w-max hidden md:flex items-center'>Temukan informasi data visual diskominfo cirebon.</h2>
        </div>

        <form className='md:ml-16 mt-[-20px] md:mt-12 md:flex items-center'>
            <input 
                type="text" 
                name='search' 
                placeholder='Ketikan judul data disini...'
                value={search} 
                onChange={(e: any) => {
                    setSearch(e.target.value)
                }} 
                className='border-0 outline-0 px-3 ml-6 py-4 w-[87%] md:mx-0 mx-auto md:w-[50vw] rounded-[14px] left-0'
            />
            <div className='w-max h-max px-3 py-4 z-[99999] md:flex hidden rounded-[10px] bg-white ml-6'>
                <select name="type_dinas" onChange={(e: any) => setType_dinas(e.target.value)} className='bg-transparent border-0 outline-0' id="type_dinas">
                    {
                        dinas.length > 0 ? (
                            dinas.map((data: any, index: number) => (
                                <option key={index} value={data?.value}>{data?.label}</option>
                            ))
                        ):
                            null
                    }
                </select>
            </div>
        </form>
        
        <div className='w-[100vw] bg-white md:bg-transparent pb-6 pt-14 md:pt-1 md:w-[86vw] flex z-40 flex flex-wrap justify-between relative md:pl-12 mt-[60px] h-max'>
            <div className='w-[90%] mx-auto h-max px-3 py-4 z-[99999] rounded-[10px] mb-8 border md:hidden border-slate-700 bg-white'>
                <select name="type_dinas" onChange={(e: any) => setType_dinas(e.target.value)} className='bg-transparent border-0 outline-0 w-full' id="type_dinas">
                    {
                        dinas.length > 0 ? (
                            dinas.map((data: any, index: number) => (
                                <option key={index} value={data?.value}>{data?.label}</option>
                            ))
                        ):
                            null
                    }
                </select>
            </div>
            {
            filteredData?.length > 0 ? (
                filteredData
                    .filter((sub: any) => {
                        // Jika pencarian tidak kosong, filter data berdasarkan label yang cocok dengan pencarian
                        if (type_dinas && type_dinas !== '') {
                            return sub.type_dinas === type_dinas
                        }
                        // Jika pencarian kosong, tampilkan semua data
                        return true;
                    })
                    ?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    ?.map((data: any, index: number) => (
                        <div key={index} className='w-[88vw] mx-auto md:mx-3 md:w-[47%] mb-8 md:mb-10 bg-white md:bg-slate-800 h-[max] px-5 pt-4 pb-5 md:p-8 border-[1px] md:border-[2px] border-slate-700 md:border-white rounded-[20px]'>
                            <div className='w-full md:w-[90%] h-max relative flex flex-col justify-between text-[20px] leading-loose text-white'>
                                <h3 title={data?.title} className='w-full md:w-[110%] text-[16px] md:text-[18px] text-slate-700 md:text-white overflow-hidden overflow-ellipsis max-w-[95%] whitespace-nowrap'>{(data?.title).toUpperCase()}</h3>
                                <div className='w-[100%] h-[140px] md:h-[220px] rounded-[10px] bg-white border-[1px] md:border-[3px] border-slate-800 md:border-white mt-5 overflow-hidden flex justify-center items-center'>
                                    <img src={data?.image} loading='lazy' alt="thumbnail" title={data?.title} className='w-full h-auto rounded-[10px]' />
                                </div>
                                <div className='w-full flex flex-col mt-6 justify-between'>
                                    <Link target='__blank' to={data?.link}>
                                        <h3 className='cursor-pointer rounded-[10px] text-[15px] md:text-[18px] w-max px-4 md:px-1 py-2 mb-4 bg-slate-800 md:bg-transparent hover:brightness-[90%] active:scale-[0.99] text-white md:text-blue-400 flex items-center'>Cek sekarang <FaArrowRight className='ml-4 relative top-[0.8]' /> </h3>
                                    </Link>
                                    <small className='max-w-full md:ml-1 md:text-white text-black overflow-hidden overflow-ellipsis whitespace-nowrap'><b>{data?.type_dinas}</b></small>
                                    <hr className='my-4 md:border-white border-slate-700 md:inline hidden' />
                                    <small className='max-w-full md:ml-1 overflow-hidden overflow-ellipsis md:inline hidden whitespace-nowrap'><b>Uploader</b> : {data?.uploader}</small>
                                </div>
                            </div>
                        </div>
                    ))
                ):
                    <div className='w-[94%] md:w-screen h-[400px] mx-auto md:ml-4 tezt-black md:text-white flex items-center justify-center rounded-[20px] border-[2px] border-black md:border-white border-dashed mb-8'>
                        <p>
                            Data visual belum di upload
                        </p>
                    </div>
            }
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
