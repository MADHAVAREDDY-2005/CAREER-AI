import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import AssessmentForm from '@/components/AssessmentForm';
import CareerRecommendations from '@/components/CareerRecommendations';
import CandyRoadMap from '@/components/CandyRoadMap';
import QuoteScreen from '@/components/QuoteScreen';
import { AssessmentData, Career } from '@/types/career';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'quote' | 'recommendations' | 'roadmap'>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setCurrentStep('quote');
  };

  const handleQuoteComplete = () => {
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

  // Check if user has a locked domain
  if (user?.selectedDomain) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center p-6">
        <Card className="card-gradient p-8 max-w-2xl w-full text-center border shadow-xl">
          <div className="mb-6">
            <Lock className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Domain Locked
            </h1>
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent my-6">
              PICK ONE. MASTER IT!
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-6 mb-6 border border-primary/20">
            <p className="text-lg text-muted-foreground mb-2">
              Your Chosen Path:
            </p>
            <p className="text-2xl font-bold text-primary">
              {user.selectedDomain}
            </p>
          </div>

          <p className="text-muted-foreground mb-6">
            You've already selected your career path. Focus on mastering your chosen domain.
            Once you commit to a path, you cannot change it - this is to ensure you stay focused and achieve mastery.
          </p>

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Continue Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

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

      {currentStep === 'quote' && (
        <QuoteScreen onComplete={handleQuoteComplete} />
      )}
      
      {currentStep === 'recommendations' && assessmentData && (
        <CareerRecommendations 
          assessmentData={assessmentData}
          onCareerSelect={handleCareerSelect}
          onBack={handleBackToAssessment}
        />
      )}
      
      {currentStep === 'roadmap' && selectedCareer && assessmentData && (
        <CandyRoadMap 
          career={selectedCareer}
          experienceLevel={assessmentData.experienceLevel}
          onBack={handleBackToRecommendations}
        />
      )}
    </div>
  );
};

export default Index;