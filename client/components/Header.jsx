import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link , useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'


export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap  md:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-300 to-blue-500 text-white rounded-lg'>Rehman's</span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden md:block'
        />
      </form>
      <Button className='w-12 h-10 md:hidden' color='gray' >
        <AiOutlineSearch />
      </Button>
       <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden md:block' color='gray' >
          <FaMoon/>
        </Button>
        <Link to='/sign-in'>
          <Button  className='bg-gradient-to-r  from-blue-500 via-sky-300 to-blue-500 hover:from-sky-500 hover:via-blue-300 hover:to-sky-500' outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
       </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/projects' } as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
