import { useEffect } from 'react'
import About from '../components/About'
import Contact from '../components/Contact'
import CreativeTeaser from '../components/CreativeTeaser'
import Education from '../components/Education'
import Experience from '../components/Experience'
import FocusAreas from '../components/FocusAreas'
import Hero from '../components/Hero'
import SkillsMarquee from '../components/SkillsMarquee'
import Stats from '../components/Stats'
import { profile } from '../data/portfolio'

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name} | ${profile.role}`
  }, [])

  return (
    <>
      <Hero />
      <SkillsMarquee />
      <Stats />
      <FocusAreas />
      <About />
      <Education />
      <Experience />
      <CreativeTeaser />
      <Contact />
    </>
  )
}
