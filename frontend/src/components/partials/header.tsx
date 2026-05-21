import { useState, useEffect } from 'react'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'WHO AM I?',
    href: '#about',
    hasDropdown: true,
    dropdownItems: [
      { label: 'ABOUT', href: '#about' },
      { label: 'SKILLS', href: '#skills' },
      { label: 'EDUCATION', href: '#education' },
      { label: 'EXPERIENCE', href: '#experience' },
      { label: 'BLOG', href: '/blog' },
    ]
  },
  {
    label: 'PROJECTS',
    href: '/projects',
    hasDropdown: true,
    dropdownItems: [
      { label: 'WEB APPS', href: '/projects/web-apps' },
      { label: 'MOBILE', href: '/projects/mobile' },
      { label: 'UI DESIGN', href: '/projects/ui-design' },
    ]
  },
  {
    label: 'CONNECT',
    href: '#connect',
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg border-b-2 border-[#000000] ${ scrolled ? 'shadow-sm backdrop-blur-2xl' : '' }`}>
      <div className="max-w-360 mx-auto flex justify-between items-center px-5 md:px-16 h-20">
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="/" className="text-[32px] leading-9 font-bold tracking-tighter text-[#000000]">
            Renn.
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full space-x-8">
          {navItems.map((item) => (
            <div key={item.label} className="nav-item group h-full flex items-center relative">
              <a href={item.href} className="font-bold text-[14px] leading-5 tracking-widest uppercase text-[#767677] hover:text-[#000000] transition-colors pb-1 kinetic-border border-[#000000] flex items-center cursor-pointer"
              >
                {item.label}
              </a>

              {/* Dropdown */}
              {item.hasDropdown && item.dropdownItems && (
                <div className="absolute top-17 left-0 w-64 bg-white border-2 border-black p-4 hidden group-hover:block transition-all">
                  <ul className="space-y-4">
                    {item.dropdownItems.map((subItem) => (
                      <li key={subItem.label}>
                        <a href={subItem.href} className="font-bold text-[14px] leading-5 tracking-widest uppercase text-[#767677] hover:text-[#000000] transition-colors block">
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-6">
          <a className="flex items-center justify-center p-2 hover:bg-[#F5F5F5] transition-all">
            <i className='fas fa-search'></i>
          </a>
          <a className="flex items-center justify-center p-2 hover:bg-[#F5F5F5] transition-all">
            <i className='fas fa-user'></i>
          </a>
          {/* Mobile Menu Icon */}
          <a className="md:hidden flex items-center justify-center p-2">
            <i className='fas fa-bars'></i>
          </a>
        </div>
      </div>
    </header>
  )
}