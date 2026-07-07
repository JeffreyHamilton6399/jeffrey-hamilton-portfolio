import { SidebarNav } from "@/components/portfolio/sidebar-nav";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Education } from "@/components/portfolio/education";
import { YouTube } from "@/components/portfolio/youtube";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background md:pl-14">
      <SidebarNav />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <YouTube />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
