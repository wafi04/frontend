"use client";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const image1 = "https://res.cloudinary.com/dstvymie8/image/upload/v1738206143/testing/625868.avif"
const image2 =
  "https://img.freepik.com/free-photo/men-playing-rugby-field_23-2150062044.jpg?semt=ais_hybrid";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      image: image1,
      smallText: "LUXURY COLLECTION",
      title: ["Elevate Your", "Style Game"],
      subtitle: "Premium Fashion & Accessories",
      description:
        "Discover our curated collection of luxury pieces designed for the modern connoisseur.",
    },
    {
      image: image2,
      smallText: "NEW SEASON",
      title: ["Summer", "Essential Edit"],
      subtitle: "Exclusive Designs",
      description:
        "Explore our latest arrivals featuring sophisticated pieces for the discerning lifestyle.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[110vh] max-h-[900px] overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                quality={100}
                className="object-cover"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
              {/* Text Content */}
              <div className="max-w-4xl space-y-6">
                {/* Small Text */}
                <div className="overflow-hidden">
                  <span
                    className={`block text-sm md:text-base text-white/90 font-light tracking-[0.2em] transform transition-all duration-700 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {slide.smallText}
                  </span>
                </div>

                {/* Main Title */}
                <div className="space-y-2">
                  {slide.title.map((line, i) => (
                    <div key={i} className="overflow-hidden">
                      <h2
                        className={`text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight transform transition-all duration-700 delay-100 ${
                          currentSlide === index
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        {line}
                      </h2>
                    </div>
                  ))}
                </div>

                {/* Subtitle */}
                <div className="overflow-hidden">
                  <p
                    className={`text-xl md:text-2xl text-white/80 font-light transform transition-all duration-700 delay-200 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                </div>

                {/* Description */}
                <div className="overflow-hidden max-w-lg">
                  <p
                    className={`text-sm md:text-base text-white/60 transform transition-all duration-700 delay-300 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    {slide.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-8 overflow-hidden">
                  <button
                    className={`group bg-white hover:bg-gray-50 text-black px-8 py-4 flex items-center space-x-4 transition-all duration-700 delay-500 ${
                      currentSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="text-sm tracking-wider font-medium">
                      EXPLORE COLLECTION
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-4">
        <button
          onClick={prevSlide}
          className="p-2 border border-white/30 hover:border-white/60 text-white/70 hover:text-white transition-colors duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 border border-white/30 hover:border-white/60 text-white/70 hover:text-white transition-colors duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 flex items-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[2px] transition-all duration-300 ${
              currentSlide === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}