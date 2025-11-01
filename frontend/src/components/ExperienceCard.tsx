import { Link } from 'react-router-dom';
import { Experience } from '../types';

interface Props {
  experience: Experience;
}

const ExperienceCard = ({ experience }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 border border-gray-100 group">
      <div className="overflow-hidden">
      <img src={experience.image_url} alt={experience.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800">{experience.title}</h3>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs font-semibold rounded">{experience.location_tag}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">From <span className="font-bold text-lg">₹{experience.price}</span></p>
        <Link to={`/details/${experience.id}`} className="block text-center bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ExperienceCard;