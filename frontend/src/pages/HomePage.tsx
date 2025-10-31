import { useState, useEffect } from 'react';
import { getExperiences } from '../services/api';
import { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(err => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)}
      </div>
    </div>
  );
};

export default HomePage;