import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { BadgeCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  { name: "Rohit Sharma", college: "BCA Delhi", review: "Viva went smooth. External didn’t question code." },
  { name: "Priya Verma", college: "IPU", review: "Project delivered before deadline. Very supportive team." },
  { name: "Aman Gupta", college: "Amity", review: "Code ran perfectly on my laptop. Scored A+." },
  { name: "Neha Singh", college: "DU", review: "Hardbound file saved my time. Clean formatting." },
  { name: "Kunal Mehta", college: "JIMS", review: "Best decision for final year project." },
  { name: "Aditi Rao", college: "Pune University", review: "Explained everything before viva." },
  { name: "Rishabh Jain", college: "Chandigarh", review: "Got full marks in internal evaluation." },
  { name: "Simran Kaur", college: "LPU", review: "Team was helpful even after payment." },
  { name: "Mohit Agarwal", college: "Jaipur", review: "Project topic customized exactly as needed." },
  { name: "Pooja Nair", college: "Kochi", review: "Professional and on-time delivery." },
  { name: "Paul", college: "Australia", review: "Smooth experience. No tension." },
  { name: "Sneha Patil", college: "Mumbai", review: "Report formatting was perfect." },
  { name: "Akash Mishra", college: "Lucknow", review: "Faculty impressed with documentation." },
  { name: "Ananya Das", college: "UK", review: "Very responsive on WhatsApp." },
  { name: "Vivek Kumar", college: "Patna", review: "Worth every rupee." },
  { name: "Nikhil Bansal", college: "Delhi", review: "Hardbound quality was premium." },
  { name: "Kavya Iyer", college: "Chennai", review: "Got distinction in project." },
  { name: "Arjun Reddy", college: "Hyderabad", review: "Best project support service." },
  { name: "Mehul Shah", college: "Ahmedabad", review: "Simple process. Quick support." },
  { name: "Sanya Malhotra", college: "Gurgaon", review: "Presentation PPT was very helpful." },
  { name: "Aditya Singh", college: "Indore", review: "Viva questions prepared me well." },
  { name: "Riya Gupta", college: "Surat", review: "Everything delivered exactly promised." },
  { name: "Varun Kapoor", college: "Bangalore", review: "Tech stack explained clearly." },
  { name: "Ishita Chatterjee", college: "Siliguri", review: "Trustworthy service." },
  { name: "Manish Pandey", college: "Bhopal", review: "Saved my semester." },
  { name: "Nandini Joshi", college: "Nagpur", review: "Easy payment and quick reply." },
  { name: "Sahil Khan", college: "Aligarh", review: "No plagiarism issues at all." },
  { name: "Ankita Soni", college: "Udaipur", review: "Highly recommended." },
  { name: "Dev Patel", college: "Vadodara", review: "Smooth and professional." },
  { name: "Pallavi Kulkarni", college: "Nashik", review: "Would refer to juniors." }
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
          <p className="text-gray-600">Join 2000+ students who aced their projects with us.</p>
        </div>

        {/* Custom Navigation Arrows used as Swiper triggers */}
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
          spaceBetween={30}
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
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="pb-4"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <div className="mb-6 flex-grow">
                  <Quote className="w-8 h-8 text-brand-100 mb-2 rotate-180" />
                  <p className="text-gray-700 italic leading-relaxed">"{t.review}"</p>
                </div>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm ${
                    ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-indigo-500'][i % 6]
                  }`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.college}</p>
                  </div>
                  <BadgeCheck className="w-4 h-4 text-blue-500 ml-auto" />
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
