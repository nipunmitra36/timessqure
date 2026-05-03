'use client';

import CommercialFloor from "@/components/CommercialFloor";
import ContactForm from "@/components/Contact";
import Gallery from "@/components/Gallery";
import HeroSlider from "@/components/HeroSection";
import HotelFacilities from "@/components/Hotelfacilities";
import HotelRooms from "@/components/HotelRooms/page";
import HotelRoomTypes from "@/components/HotelRoomTypes";
import HotelShares from "@/components/HotelShares";
import Partnerships from "@/components/Partnerships";
import ProjectGlance from "@/components/ProjectGlance";
// import CoursesList from "../components/courses/CoursesList";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ProjectGlance />
      <CommercialFloor />
      <HotelRooms />
      <Gallery />
      <HotelRoomTypes />
      <HotelShares />
      <HotelFacilities />
      <Partnerships />
      <ContactForm />
    </main>
  );
}