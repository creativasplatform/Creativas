import CreativasLogo from '../assets/CreativasLogo.png'


const Navbar = () => {
  return (


    <nav className="bg-black py-1">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
    <a className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={CreativasLogo} className="h-28" />
    </a>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
        <li>
          <a href="#" className="block px-2 text-white rounded md:bg-transparent" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block px-2 text-white rounded md:bg-transparent">Docs</a>
        </li>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
      </ul>
    </div>
  </div>
</nav>


  )
}

export default Navbar;