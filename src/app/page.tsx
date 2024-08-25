import Image from "next/image";
import "./page.scss";
import { Heading } from "@/components/atoms/Heading";
import { TextPill } from "@/components/atoms/TextPill";
import { Header } from "@/components/molecules/Header";
import { HeroBanner } from "@/components/organisms/Herobanner";
export default function Home() {
  return (
    <main className=''>
      <Header></Header>
      <HeroBanner></HeroBanner>
    </main>
  );
}