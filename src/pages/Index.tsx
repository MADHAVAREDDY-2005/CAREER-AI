import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AssessmentForm from '@/components/AssessmentForm';
import CareerRecommendations from '@/components/CareerRecommendations';
import VisualRoadmap from '@/components/VisualRoadmap';
import AuthManager from '@/components/AuthManager';
import { AssessmentData, Career } from '@/types/career';
import { isLoggedIn, getAuth } from '@/lib/storage';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'recommendations' | 'roadmap'>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setCurrentStep('recommendations');
  };

  const handleCareerSelect = (career: Career) => {
    setSelectedCareer(career);
    setCurrentStep('roadmap');
  };

  const handleBackToAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleBackToRecommendations = () => {
    setCurrentStep('recommendations');
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <AuthManager onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <>
          {currentStep === 'hero' && (
            <HeroSection onStartAssessment={handleStartAssessment} />
          )}
      
      {currentStep === 'assessment' && (
        <AssessmentForm 
          onComplete={handleAssessmentComplete}
          onBack={() => setCurrentStep('hero')}
        />
      )}
      
      {currentStep === 'recommendations' && assessmentData && (
        <CareerRecommendations 
          assessmentData={assessmentData}
          onCareerSelect={handleCareerSelect}
          onBack={handleBackToAssessment}
        />
      )}
      
      {currentStep === 'roadmap' && selectedCareer && assessmentData && (
        <VisualRoadmap
          career={selectedCareer}
          experienceLevel={assessmentData.experienceLevel}
          onBack={handleBackToRecommendations}
        />
      )}
        </>
      )}
    </div>
  );
};

export default Index;