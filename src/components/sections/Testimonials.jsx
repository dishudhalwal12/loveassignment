import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const profileImages = [
  '/pfp/0eef600c4aee2c986504050a1d988c7f.jpg',
  '/pfp/26ac83b59b9483944c99dcb9104a28e0.jpg',
  '/pfp/2a9bd72cb276c78aa3a82ddaf8ce57bf.jpg',
  '/pfp/32eb4049fc17b28b23bb11c7febfa298.jpg',
  '/pfp/3e938db6467dd7773eec10a63a1c9ae9.jpg',
  '/pfp/3f117195af8de79f76d09d3673dd9d4f.jpg',
  '/pfp/412eb448fb72053b06b82b7f36a6447e.jpg',
  '/pfp/5a795e60c839b2ade3a6257446750903.jpg',
  '/pfp/6390b3720c610903502b8c9dfac7ccc7.jpg',
  '/pfp/69f3d6ddd5757c57005bba9288221a47.jpg',
  '/pfp/9a7b726ba395074e6bf7be18ce7ee587.jpg',
  '/pfp/a1fbddda7de06260f6d543f3c7ff616f.jpg',
  '/pfp/a270615c7ea87b9f40559dd720e66dbb.jpg',
  '/pfp/a36a908c3e19517116a5d125dcc61e7d.jpg',
  '/pfp/c6cb82181f943e7ec9ea932b8e3addf5.jpg',
  '/pfp/eb9bd195d946e8535f3d73196e96c21e.jpg',
];

const testimonials = [
  {
    name: "Aarav Mehta",
    city: "Jaipur",
    rating: 5,
    review: "Honestly I was nervous about final submission. They guided me step by step. By the end it felt simple. Huge relief."
  },
  {
    name: "Riya Sharma",
    city: "Delhi",
    rating: 5,
    review: "Code ran without errors. That's all I needed. Thank you."
  },
  {
    name: "Kunal Verma",
    city: "Chandigarh",
    rating: 5,
    review: "They actually listened to my topic idea. Did not push a random template. Everything was built around my requirement. That mattered a lot."
  },
  {
    name: "Simran Kaur",
    city: "Amritsar",
    rating: 4,
    review: "Viva prep material saved me. Questions were exactly what panel asked. I walked out smiling."
  },
  {
    name: "Mohit Agarwal",
    city: "Lucknow",
    rating: 5,
    review: "Fast replies on WhatsApp. Clear instructions. No confusion. Smooth process overall."
  },
  {
    name: "Aditi Rao",
    city: "Kochi",
    rating: 5,
    review: "I liked that they checked the project on my laptop. No surprise errors during presentation. Small detail but very important."
  },
  {
    name: "Rohit Singh",
    city: "Patna",
    rating: 4,
    review: "Slides were clean. Report format matched guidelines. Did not have to edit much. Time saved."
  },
  {
    name: "Neha Gupta",
    city: "Bhopal",
    rating: 5,
    review: "I thought this would be risky. But delivery was on time. Quality was better than expected. Worth trusting."
  },
  {
    name: "Arjun Nair",
    city: "Trivandrum",
    rating: 5,
    review: "Hardbound file looked premium. Print quality was sharp. Panel noticed it. Felt professional."
  },
  {
    name: "Priya Patel",
    city: "Ahmedabad",
    rating: 4,
    review: "Very friendly support. Never felt like just another order. They cared till submission."
  },
  {
    name: "Sarthak Mishra",
    city: "Kanpur",
    rating: 5,
    review: "First draft came early. I suggested changes. They updated quickly. Easy collaboration."
  },
  {
    name: "Kavya Iyer",
    city: "Chennai",
    rating: 5,
    review: "Project logic explained well. I could answer follow up questions. That boosted my confidence."
  },
  {
    name: "Rohan Das",
    city: "Kolkata",
    rating: 4,
    review: "Simple booking. Regular updates. Delivered as promised."
  },
  {
    name: "Ananya Sen",
    city: "Pune",
    rating: 5,
    review: "I was scared about viva. Ended up being my best part. Thanks to their question set."
  },
  {
    name: "Aditya Joshi",
    city: "Nagpur",
    rating: 5,
    review: "Code comments helped me understand flow. I actually learned something. Not just copy paste."
  },
  {
    name: "Sneha Reddy",
    city: "Hyderabad",
    rating: 5,
    review: "They customized everything. Not a reused project. My guide appreciated originality."
  },
  {
    name: "Vishal Kumar",
    city: "Ranchi",
    rating: 4,
    review: "Quick, clean, and reliable. No drama. Just results."
  },
  {
    name: "Mehul Jain",
    city: "Surat",
    rating: 5,
    review: "Website experience was smooth. Payment to delivery. Everything transparent."
  },
  {
    name: "Pooja Verma",
    city: "Indore",
    rating: 5,
    review: "Even after delivery they helped. That support was unexpected. Respect for that."
  },
  {
    name: "Nikhil Bansal",
    city: "Gurgaon",
    rating: 4,
    review: "Recommended them to my juniors. Good quality. On time. No complaints."
  },
];

const Testimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section id="reviews" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="section-container relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Students Say</h2>
          <p className="text-gray-600">Join 2000+ students who aced their final year projects with us.</p>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden md:flex -ml-4 lg:-ml-12">
          <button ref={prevRef} className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-brand-600 hover:scale-110 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:flex -mr-4 lg:-mr-12">
          <button ref={nextRef} className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-brand-600 hover:scale-110 transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          className="pb-4"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className={`text-sm ${star <= t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: '15px' }}>
                    {t.review}
                  </p>
                </div>
                
                {/* Profile Footer */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={profileImages[i % profileImages.length]} 
                      alt={t.name}
                      width="44"
                      height="44"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                  <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
