"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = ({ images }: { images: any[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const toggleButtonsDisabled = (emblaApi: any) => {
    setPrevButtonDisabled(!emblaApi.canScrollPrev());
    setNextButtonDisabled(!emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;

    toggleButtonsDisabled(emblaApi);
    emblaApi.on("reInit", toggleButtonsDisabled);
    emblaApi.on("select", toggleButtonsDisabled);
  }, [emblaApi]);

  return (
    <div className="embla relative group">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex" style={{ touchAction: "pan-y pinch-zoom" }}>
          {!!images?.length &&
            images.map((image: any, index: any) => {
              return (
                <div
                  key={index}
                  className="embla__slide aspect-[1/1] relative flex-[0_0_100%] min-w-0"
                >
                  {!!image.url && (
                    <Image
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className="object-cover"
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 800px"
                      fill
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <button
        className="embla__prev absolute top-[calc(100%-50%-24px)] left-2 opacity-0 group-hover:opacity-95 rounded bg-white py-2 px-1"
        onClick={scrollPrev}
        disabled={prevButtonDisabled}
      >
        <Image
          title="Back"
          src="/chevronLeft.svg"
          className="w-[48px] h-[48px]"
          alt="Chevron left circle SVG icon"
          width={20}
          height={20}
        />
      </button>
      <button
        className="embla__next absolute top-[calc(100%-50%-24px)] right-2 opacity-0 group-hover:opacity-95 rounded bg-white py-2 px-1"
        onClick={scrollNext}
        disabled={nextButtonDisabled}
      >
        <Image
          title="Forward"
          src="/chevronRight.svg"
          className="w-[48px] h-[48px]"
          alt="Chevron right circle SVG icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default Carousel;
