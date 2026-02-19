import React, { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const NewArrivals = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const newArrivals = [
        {
            id :"1",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"2",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"3",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"4",
            name: "Stylish Jeans",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"Stylish Jeans"
                },
            ],
        },
        {
            id :"5",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"6",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"7",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"Stylish Jacket"
                },
            ],
        },
        {
            id :"8",
            name: "Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"Stylish Jacket"
                },
            ],
        },
    ]

    const scroll = (direction : 'left' | 'right') => {
        const container = scrollRef.current;
        const scrollAmount = direction === 'left' ? -400 : 400;
        container.scrollBy ({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if(container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable); 
        }
        console.log({
            scrollLeft: container?.scrollLeft,
            containerScrollWidth: container?.scrollWidth,
            clientWidth: container?.clientWidth,
        });
    }
    
    React.useEffect(() => {
        const container =scrollRef.current;
        if(container) {
            container.addEventListener("scroll",updateScrollButtons);
            updateScrollButtons();
        } 
    },[])

    return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'> Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8'>
                Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion
            </p>
            <div className='flex justify-end mb-4 space-x-2'>
                  <button onClick={() => scroll('left')} disabled={!canScrollLeft} className='p-2 rounded border bg-white text-black'>
                    <FiChevronLeft className='text-2xl '/>
                  </button>
                  <button onClick={() => scroll('right')} disabled={!canScrollRight} className='p-2 rounded border bg-white text-black'>
                    <FiChevronRight className='text-2xl '/>
                  </button>
            </div>
            <div ref={scrollRef} className='container mx-auto overflow-x-scroll flex space-x-6 relative '>
                {newArrivals.map((product) => (
                    <div key={product.id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url} 
                        alt={product.images[0]?.altText || product.name} className='w-full h-[500px] object-cover rounded-lg'/>
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <a href={`/product/${product.id}`} className='block'>
                                <h3 className='font-medium'>{product.name}</h3>
                                <p className='mt-1'>${product.price}</p>
                            </a>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    </section>
    )
}

export default NewArrivals