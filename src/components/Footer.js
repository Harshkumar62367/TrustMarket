import Link from 'next/link'
import { FaFacebook , FaTwitter , FaLinkedin } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
const Footer = () => {
  const date = new Date;
  const year = date.getFullYear();
  return (
    <div className="mt-[10rem] bg-gray-100 dark:bg-[#10111f] text-sm">

      <div className="mb-10 w-[90%] grid gap-2 md:gap-4 lg:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 m-[auto] items-start justify-items-center">

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-3 md:order-3 lg:order-1'>
          <h1 className="font-sans text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-[#ae52ca] cursor-pointer">
            <Link href="/">
              TrustM(:
            </Link>
          </h1>
          <p className='max-w-[16rem] py-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          <div className='flex gap-3 py-2 '>
            <a href="https://facebook.com" className='transition ease-in delay-50 text-pink-600 dark:hover:text-gray-300 hover:scale-[110%]'>
              <FaFacebook size={30}/>
            </a>
            <a href="https://twitter.com" className='transition ease-in delay-50 text-pink-600 dark:hover:text-gray-300 hover:scale-[110%]'>
              <FaTwitter size={30}/>
            </a>
            <a href="https://web.whatsapp.com" className='transition ease-in delay-50 text-pink-600 dark:hover:text-gray-300 hover:scale-[110%]'>
              <IoLogoWhatsapp size={30}/>
            </a>
            <a href="https://linkedin.com" className='transition ease-in delay-50 text-pink-600 dark:first-letter:hover:text-gray-300 hover:scale-[110%]'>
              <FaLinkedin size={30}/>
            </a>
          </div>
        </div>

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-2 md:order-2 lg:order-2'>
          <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-pink-600 mr-3'>|</h1><h1 className='text-lg font-semibold'>Tools</h1></div>
          <ul className='mt-2'>
            <li className='pt-1 hover:text-pink-600'><Link href="/tools">PV Matrix Basic</Link></li>
            <li className='pt-1 hover:text-pink-600'><Link href="/tools">GPS Mapper</Link></li>
            <li className='pt-1 hover:text-pink-600'><Link href="/tools">Matrix Solver</Link></li>
          </ul>
        </div>

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-1 md:order-1 lg:order-3'>
          <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-pink-600 mr-3'>|</h1><h1 className='text-lg font-semibold'>Pages</h1></div>
          <ul className='mt-2'>
            <li className='pt-1 hover:text-pink-600'><Link href="/people">People</Link></li>
            <li className='pt-1 hover:text-pink-600'><Link href="/research">Research</Link></li>
            <li className='pt-1 hover:text-pink-600'><Link href="/tools">Tools</Link></li>
            <li className='pt-1 hover:text-pink-600'><Link href="/weather">Weather</Link></li>
          </ul>
        </div>

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-4 md:order-4 lg:order-4'>
          <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-pink-600 mr-3'>|</h1><h1 className='text-lg font-semibold'>Contact Us</h1></div>
          <p className='max-w-[16rem] py-2'>TrustM(:, Electrical Engineering Department, NIT Patna, Ashok Rathpath, 80005</p>
          <p>Ph : <a href="tel:+911256131543" className='text-pink-600 ml-2 font-semibold'>+91 12561 31543</a></p>
          <p>Mail : <a href="mailto:nasg@nitp.ac.in" className='text-pink-600 ml-2 font-semibold'>trustme@nitp.ac.in</a></p>
        </div>

      </div>

      <div className="w-[90%] m-[auto] bg-gray-800 h-[2px]"></div>
      <div className="m-[auto] pb-8 pt-5 text-gray-800 dark:text-gray-400 dark:font-light flex flex-col md:flex-row lg:flex-row justify-between items-center w-[90%] text-base">
        <p>
          © {year} TrustM(:. All Rights Reserved.
        </p>
        <p>
          Designed & Developed by <a className="text-base font-medium text-pink-600" href="https://sudhanshuranjan.live">Sudhanshu Ranjan</a>.
        </p>
      </div>
    </div>
  )
}

export default Footer