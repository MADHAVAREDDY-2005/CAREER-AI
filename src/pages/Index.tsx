import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import AssessmentForm from '@/components/AssessmentForm';
import CareerRecommendations from '@/components/CareerRecommendations';
import CandyRoadMap from '@/components/CandyRoadMap';
import { AssessmentData, Career } from '@/types/career';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'recommendations' | 'roadmap'>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

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
    // Check if user has started any roadmap
    const stored = localStorage.getItem('career_roadmap_progress');
    if (stored) {
      const allProgress = JSON.parse(stored);
      const hasAnyProgress = allProgress.some((p: any) => p.completedNodeIds.length > 0);
      
      if (hasAnyProgress) {
        // Don't allow going back if progress exists
        return;
      }
    }
    setCurrentStep('recommendations');
  };

  return (
    <div className="min-h-screen">
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
      
      {currentStep === 'roadmap' && selectedCareer && (
        <CandyRoadMap 
          career={selectedCareer}
          onBack={handleBackToRecommendations}
        />
      )}
    </div>
  );
};

export default Index;