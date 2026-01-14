import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import deliveryVan from "../../../assets/delivery-van.png"
import  liveTracking  from "../../../assets/live-tracking.png";
import  safeDelivery  from "../../../assets/safe-delivery.png";


const Banner = () => {
  return (
    <div className="w-full mb-6">

      {/* ==== CAROUSEL ==== */}
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={bannerImg1} alt="banner-1" />
        </div>
        <div>
          <img src={bannerImg2} alt="banner-2" />
        </div>
        <div>
          <img src={bannerImg3} alt="banner-3" />
        </div>
      </Carousel>


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h2 className="text-3xl font-bold text-pink-700  mb-10">
    How it Works
  </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-amber-200 gap-6">
 
  {/* Card 1 */}
  <div className="transform rounded-xl bg-purple-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center rounded-lg bg-green-50 p-3">
        <img src={deliveryVan} alt="" className="" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-green-600">Booking Pick & Drop</h3>
        <p className="mt-2 text-sm text-gray-500">
          Fast and reliable pick and drop service for your deliveries.
        </p>
      </div>
    </div>
  </div>

  {/* Card 2 */}
  <div className="transform rounded-xl bg-purple-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center rounded-lg bg-green-50 p-3">
        <img src={deliveryVan} alt="" className="" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-green-600">Cash on Delivery</h3>
        <p className="mt-2 text-sm text-gray-500">
          Secure cash on delivery payment option for your customers.
        </p>
      </div>
    </div>
  </div>

  {/* Card 3 */}
  <div className="transform rounded-xl bg-purple-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center rounded-lg bg-green-50 p-3">
        <img src={deliveryVan} alt="" className="" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-green-600">Delivery Hub</h3>
        <p className="mt-2 text-sm text-gray-500">
          Centralized hubs for quick sorting and dispatch of your orders.
        </p>
      </div>
    </div>
  </div>

  {/* Card 4 */}
  <div className="transform rounded-xl bg-purple-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center rounded-lg bg-green-50 p-3">
        <img src={deliveryVan} alt="" className="" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-green-600">Booking SME & Corporate</h3>
        <p className="mt-2 text-sm text-gray-500">
          Tailored booking solutions for SMEs and corporate clients.
        </p>
      </div>
    </div>
  </div>
</div>
</div>


      {/* ==== SERVICES SECTION BELOW CAROUSEL ==== */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">

          {/* Panel */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-teal-800 to-teal-700 px-8 py-14 shadow-xl">

            {/* Decorative shape */}
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-teal-600 opacity-20"></div>

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center text-white">
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                Our Services
              </h2>
              <p className="mx-auto max-w-xl text-sm opacity-80">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
              </p>
            </div>

            {/* Service Grid */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {/* Card 1 */}
              <div className="transform rounded-xl bg-red-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-lg bg-violet-50">
                    <img src={deliveryVan} alt=""className="" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-pink-700">Express & Standard Delivery</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      We deliver parcels within 24/72 hours depending on distance and service type.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="transform rounded-xl bg-pink-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex  items-center justify-center rounded-lg bg-amber-50">
                <img src={deliveryVan} alt=""
        className="" />
                    
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-pink-700">Nationwide Delivery</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Coverage across the country with secure handling and tracking updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="transform rounded-xl bg-green-200 p-6 shadow-md ring-1 ring-gray-200 transition hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center rounded-lg bg-green-50">
                <img src={deliveryVan} alt=""
                className="" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-pink-700">Fulfillment Solution</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Inventory, packing and fulfillment services to streamline your e-commerce.
                    </p>
                  </div>
                </div>
              </div>
             </div>
              </div>
             </div>
      </section>

     {/* delivery part 3rd */}
     <section class="py-12 bg-red-300 border-2 border-amber-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-6">
            
    <div class="bg-indigo-200 rounded-lg shadow-md p-6 border border-gray-200 flex items-start">
                <div class="flex-shrink-0 mr-4 w-30 h-30">
      <img src={liveTracking} alt="Live 
                    Parcel Tracking" class="w-full h-full object-cover 
                    rounded-full"/>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-indigo-600 mb-2">Live Parcel Tracking</h3>
                    <p class="text-gray-600">Easily track your parcel's journey and get real-time status updates on the go, ensuring you always know where your delivery is.</p>
                </div>
            </div>

            <div class="bg-pink-200 rounded-lg shadow-md p-6 border border-gray-200 flex items-start">
                <div class="flex-shrink-0 mr-4 w-30 h-30">
                    <img src={safeDelivery} alt="100% 
                    Safe Delivery" class="w-full h-full object-cover
                     rounded-full"/>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-indigo-600 mb-2">100% Safe Delivery</h3>
                    <p class="text-gray-600">We ensure your parcels are handled with the utmost care and delivered securely to their destination without any risk of damage or loss.</p>
                </div>
            </div>

            <div class="bg-gray-200 rounded-lg shadow-md p-6 border border-gray-200 flex items-start">
                <div class="flex-shrink-0 mr-4 w-30 h-30">
                    <img src={safeDelivery} alt="24/7
                     Call Center Support" class="w-full h-full 
                     object-cover rounded-full"/>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-indigo-600 mb-2">24/7 Call Center Support</h3>
                    <p class="text-gray-600">Our dedicated support team is available around the clock to assist you instantly with any questions, updates, or delivery issues.</p>
                </div>
            </div>

        </div>
    </div>
</section>

    </div>
  );
};

export default Banner;
