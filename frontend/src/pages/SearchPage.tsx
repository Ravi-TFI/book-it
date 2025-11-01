import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getExperiences } from '../services/api';
import { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
    const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExperiences()
            .then(data => {
                setAllExperiences(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching experiences:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (query && allExperiences.length > 0) {
            const results = allExperiences.filter(exp =>
                exp.title.toLowerCase().includes(query.toLowerCase()) ||
                exp.location_tag.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExperiences(results);
        }
    }, [query, allExperiences]);

    if (loading) return <p className="text-center p-10">Loading...</p>;

    return (
        <div className="container mx-auto px-6 py-12 md:px-8">
            <h1 className="text-3xl font-bold mb-6">
                Results for "{query}"
            </h1>
            {filteredExperiences.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredExperiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)}
                </div>
            ) : (
                <p className="text-center text-gray-600">No experiences found matching your search.</p>
            )}
        </div>
    );
};

export default SearchPage;