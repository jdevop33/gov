"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { title: "Dashboard", path: "/" },
  { title: "Planning Guide", path: "/guide" },
  { title: "Decision Tool", path: "/tool" },
  { title: "Fiscal Strategies", path: "/strategies" },
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check user preference
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(savedMode === 'true' || (!savedMode && prefersDark))
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', (!darkMode).toString())
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Government Banner */}
      <div className="bg-[hsl(202,80%,24%)] text-white py-1 px-4 text-center text-xs md:text-sm font-medium">
        Province of British Columbia - Municipal Asset Management Dashboard
      </div>
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5H21M3 9.5H21M3 14.5H21M3 19.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="ml-2 text-xl font-semibold">BC Municipal Finance</span>
              </div>
            </div>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.title} 
                  href={item.path}
                  className={`font-medium text-sm ${
                    pathname === item.path
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                  } transition-colors`}
                >
                  {item.title}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="rounded-full p-1.5 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.path
                      ? "bg-primary text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
                <span className="ml-2">
                  {darkMode ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Province of British Columbia. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                Terms of Use
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

