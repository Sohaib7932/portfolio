//'use client'
import Navbar from "./components/navbar";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
   <>
   <Navbar />
   <Header />
   <About />
   <Services />
   <RecentProjects />
   <Contact />
   <Footer />
   </>
  );
}
