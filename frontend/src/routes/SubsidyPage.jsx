import React, { useState, useEffect } from 'react';
import { fetchSubsidies } from '../services/subsidy.service';
import Card from '../components/Card';
import ApplicationForm from '../components/ApplicationForm';
import Modal from '../components/Modal';
import RequirementsModal from '../components/RequirementsModal';
import '../styles/subsidyPage.css'; 
import Loading from '../components/Loading';

const SubsidyPage = () => {
    const [subsidies, setSubsidies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentSubsidyId, setCurrentSubsidyId] = useState(null);
    const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
    const [currentSubsidy, setCurrentSubsidy] = useState(null);

    const handleApplyClick = (subsidy) => {
        setCurrentSubsidy(subsidy);
        setIsFormOpen(true);
    };

    const handleViewRequirementsClick = (subsidy) => {
        setCurrentSubsidy(subsidy);
        setIsRequirementsOpen(true);
    };

    useEffect(() => {
        const getSubsidies = async () => {
            try {
                const data = await fetchSubsidies();
                setSubsidies(data);
            } catch (error) {
                setError('Error al cargar los subsidios');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getSubsidies();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loading />
            </div>
        );
    }

    if (error) return <div>Ha ocurrido un error: {error}</div>;

    return (
        <div className="subsidy-page-container">
            <div className="subsidy-page-header">
                <h1>Subsidios y Beneficios</h1>
                <p>Estos son los subsidios con los que cuenta el municipio</p>
            </div>
            <div className="card-container">
                {subsidies.length > 0 ? (
                    subsidies.map((subsidy) => (
                        <Card
                            key={subsidy._id}
                            name={subsidy.name}
                            description={subsidy.description}
                            type={subsidy.typeSubsidy}
                            dateEnd={subsidy.dateEnd}
                            onApply={() => handleApplyClick(subsidy)}
                            onViewRequirements={() => handleViewRequirementsClick(subsidy)}
                        />
                    ))
                ) : (
                    <div>No hay subsidios disponibles.</div>
                )}
                <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                    <ApplicationForm
                        subsidyId={currentSubsidy?._id}
                        subsidyName={currentSubsidy?.name}
                        onClose={() => setIsFormOpen(false)}
                    />
                </Modal>
                <RequirementsModal
                    isOpen={isRequirementsOpen}
                    onClose={() => setIsRequirementsOpen(false)}
                    subsidy={currentSubsidy}
                />
            </div>
        </div>
    );
};

export default SubsidyPage;
