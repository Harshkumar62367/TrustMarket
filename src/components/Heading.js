import Image from 'next/image'

const Heading = (props) => {
  return (
    <div data-aos="fade-up" className='w-[100%] m-[auto] text-center'>
      <p className={props.src ? 'text-pink-600 pb-2' : 'text-pink-600'}>TrustM(:</p>
      {props.src ? <Image className='m-auto' src={props.src} alt="me" width="190" height="35" /> : <h2 className='text-3xl font-bold'>{props.text}</h2>}
    </div>
  )
}

const SmallHeading = (props) => {
  return (
    <div data-aos="fade-up" className='w-[100%] m-[auto] text-center'>
      <h2 className='text-[#1CD0EA] text-2xl font-bold'>{props.text}</h2>
    </div>
  )
}

const LgHeading = (props) => {
  return (
    <div>
      <div data-aos="fade-up" className='flex items-baseline justify-start'>
        <h1 className='text-4xl md:text-5xl lg:text-5xl pr-2 font-extrabold text-[#1CD0EA]'>|</h1>
        <h1 className='text-4xl md:text-5xl lg:text-5xl font-bold'>{props.title}</h1>
      </div>
    </div>
  )
}

export { Heading, SmallHeading, LgHeading }