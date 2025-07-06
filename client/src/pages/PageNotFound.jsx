import { Link } from 'react-router-dom'; 
import FuzzyText from '../Reactbits/FuzzyText/FuzzyText.jsx';

export default function PageNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white dark:bg-gray-700">

      <FuzzyText 
        baseIntensity={0.2} 
        >
        404
      </FuzzyText>  
      <div className="text-center my-6">
        <FuzzyText
            baseIntensity={0.1}
            fontSize='2rem'
            >
            Oops! The page you’re looking for doesn’t exist.
        </FuzzyText>
      </div>

      <Link
        to="/"
        className="bg-slate-200 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:opacity-90  dark:bg-slate-600 transition"
      >
        Go Home
      </Link>
    </main>
  );
}
