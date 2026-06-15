import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import slide1 from "../assets/imgs/slider1.png";
import slide2 from "../assets/imgs/slider2.png";
import slide3 from "../assets/imgs/slider3.png";
import slide4 from "../assets/imgs/slider4.png";
import slidermo1 from "../assets/imgs/slider-mo1.png";
import slidermo2 from "../assets/imgs/slider-mo2.png";
import slidermo3 from "../assets/imgs/slider-mo3.png";
import slidermo4 from "../assets/imgs/slider-mo4.png";

const sliderImages = [
  {
    src: slide1,
    title: "Free tax prep done by AI + reviewed by real CPAs",
  },
  {
    src: slide2,
    title: "Your data is encrypted & stored securely (SOC2, AES-256, etc.)",
  },
  {
    src: slide3,
    title: "Upload documents in minutes. No hidden fees.",
  },
  {
    src: slide4,
    title: "Track your tax return status from preparation to refund.",
  },
];

const sliderMobileImages = [
  {
    src: slidermo1,
    title: "Free tax prep done by AI + reviewed by real CPAs",
  },
  {
    src: slidermo2,
    title: "Your data is encrypted & stored securely (SOC2, AES-256, etc.)",
  },
  {
    src: slidermo3,
    title: "Upload documents in minutes. No hidden fees.",
  },
  {
    src: slidermo4,
    title: "Track your tax return status from preparation to refund.",
  },
];

export default function AuthSlider() {
  const renderSwiper = (images) => (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      // autoplay={{
      //   delay: 2000,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        el: ".custom-swiper-pagination",
        type: "bullets",
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} custom-bullet"></span>`;
        },
      }}
      navigation={{
        prevEl: ".custom-swiper-prev",
        nextEl: ".custom-swiper-next",
      }}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <p className="h-[138px] text-2xl 2xl:text-[36px] font-semibold text-white p-5 md:pt-[10%] md:pr-[15%] md:pl-[11%]">
            {image.title}
          </p>
          <img
            src={image.src}
            className="float-right rounded-tl-[20px] w-[85%] h-auto md:max-h-100 md:w-[90%] md:mt-[30%] mt-[5%]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="md:m-auto w-full md:w-[30%]">
      <div className="auth-slider rounded-2xl min-h-auto md:min-h-[97vh]">
        {/* 📱 Mobile Slider */}
        <div className="block md:hidden">
          {renderSwiper(sliderMobileImages)}
        </div>

        {/* 🖥 Desktop Slider */}
        <div className="hidden md:block">{renderSwiper(sliderImages)}</div>
        {/* Desktop Controls */}
        <div className="hidden md:block mt-[19%] md:px-8">
          <div className="flex items-center justify-center">
            <button className="custom-swiper-prev text-white bg-[#C8FFEC0D] border border-gray-500 rounded-[30px] py-[5px] px-[20px] mx-[30px] xl:mr-[30px] xl:ml-0">
              <FaArrowLeft />
            </button>

            <div className="custom-swiper-pagination flex items-center justify-center hidden xl:block" />

            <button className="custom-swiper-next text-white bg-[#C8FFEC0D] border border-gray-500 rounded-[30px] py-[5px] px-[20px] mx-[30px] xl:ml-[30px] xl:mr-0">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
