import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-[#020a21] to-[#0a1a42] text-white dark:text-gray-300 pt-12 pb-6 mt-12'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

        <div>
          <h3 className='text-xl font-semibold mb-4 border-b-2 border-green-500 inline-block'>About Me</h3>
          <p className='text-gray-400 dark:text-gray-400 mb-4'>
            I provide exceptional services with a focus on quality and customer satisfaction.
          </p>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4 border-b-2 border-green-500 inline-block'>Quick Links</h3>
          <ul className='space-y-2'>
            <li><Link to='/' className='hover:text-green-400 transition-colors duration-300'>Home</Link></li>
            <li><Link to='/about' className='hover:text-green-400 transition-colors duration-300'>About Us</Link></li>
            <li>
              <a
                href="mailto:yashwanthvuppala77@gmail.com"
                className="hover:text-green-400 transition-colors duration-300"
              >
                Contact Us: yashwanthvuppala77@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-xl font-semibold mb-4 border-b-2 border-green-500 inline-block'>Join Us</h3>
          <p className='text-gray-400 dark:text-gray-400 mb-2'>Whoever has a passion towards this Website. Click below to mail me.</p>
          <a
            href="mailto:yashwanthvuppala77@gmail.com"
            className="text-white hover:text-green-400 transition-colors duration-300"
          >
            Apply for development
          </a>
        </div>

      </div>

      <div className='border-t border-gray-700 mt-12 pt-6 text-center text-gray-400'>
        <p>&copy; {new Date().getFullYear()} <span className='text-green-400 font-semibold'>MarvelEstate</span>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
