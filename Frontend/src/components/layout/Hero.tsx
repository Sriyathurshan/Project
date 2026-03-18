import heroImg from '../../assets/rabbit-hero.webp'

const Hero = () => {
  return (
        <section className='relative'>
            <img src={heroImg} alt="Hero" className='w-full h-100 md:h-150 lg:h-187.5 object-cover' />
            <div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1 className='text-8xl md:text-9-xl font-bold tracking-tighter uppercase mb-4'>
                        vacation <br /> Be ready
                    </h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'>
                        Explore our exclusive collection of travel essentials and gear up for your next adventure with style and comfort.
                    </p>
                    <a href="#" className='bg-white text-black px-6 py-2 rounded-sm text-lg hover:bg-gray-400 transition'>
                        Shop Now
                    </a>
                </div>
            </div>
        </section>
  )
}

export default Hero