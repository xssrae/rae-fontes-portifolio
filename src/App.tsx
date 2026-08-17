import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Experiences from '@/pages/Experiences'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative w-full min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experiences />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
