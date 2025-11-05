import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { AssessmentData } from '@/types/career';

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
  onBack: () => void;
}

const AssessmentForm = ({ onComplete, onBack }: AssessmentFormProps) => {
  const [formData, setFormData] = useState<AssessmentData>({
    interests: [],
    currentSkills: [],
    experienceLevel: 'beginner',
    timeCommitment: '',
    careerGoals: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const commonInterests = [
    'Web Development', 'Mobile Apps', 'Machine Learning', 'Data Science',
    'Cloud Computing', 'Cybersecurity', 'Game Development',
    'Blockchain', 'DevOps', 'UI/UX Design', 'Backend Development', 'Frontend Development'
  ];

  const commonSkills = [
    'Python', 'JavaScript', 'Java', 'React', 'Node.js', 'SQL',
    'HTML/CSS', 'Git', 'Linux', 'Docker', 'AWS', 'MongoDB'
  ];

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setCurrentInput('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.currentSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isFormValid = formData.interests.length > 0 || formData.currentSkills.length > 0;

  return (
    <div className="min-h-screen hero-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-foreground hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Career Assessment</h1>
          <div className="w-24"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="card-gradient p-8">
            <div className="space-y-8">
              {/* Interests Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  What are your interests? (Select or add your own)
                </Label>
                
                {/* Common Interests */}
                <div className="flex flex-wrap gap-2">
                  {commonInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => addInterest(interest)}
                    >
                      {interest}
                      {formData.interests.includes(interest) && (
                        <X className="w-3 h-3 ml-1" onClick={(e) => {
                          e.stopPropagation();
                          removeInterest(interest);
                        }} />
                      )}
                    </Badge>
                  ))}
                </div>

                {/* Custom Interest Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom interest..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest(currentInput))}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addInterest(currentInput)}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected Interests */}
                {formData.interests.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Your Interests:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge 
                          key={interest} 
                          className="bg-primary text-primary-foreground"
                        >
                          {interest}
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => removeInterest(interest)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Skills Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  What are your current skills? (Optional)
                </Label>
                
                {/* Common Skills */}
                <div className="flex flex-wrap gap-2">
                  {commonSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.currentSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-success/20 transition-colors"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                      {formData.currentSkills.includes(skill) && (
                        <X className="w-3 h-3 ml-1" onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(skill);
                        }} />
                      )}
                    </Badge>
                  ))}
                </div>

                {/* Custom Skill Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addSkill(skillInput)}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selected Skills */}
                {formData.currentSkills.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Your Current Skills:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.currentSkills.map((skill) => (
                        <Badge 
                          key={skill} 
                          className="bg-success text-success-foreground"
                        >
                          {skill}
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => removeSkill(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  Experience Level
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'New to programming' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
                    { value: 'advanced', label: 'Advanced', desc: 'Experienced developer' }
                  ].map(({ value, label, desc }) => (
                    <Card
                      key={value}
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        formData.experienceLevel === value 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, experienceLevel: value as any }))}
                    >
                      <h3 className="font-semibold">{label}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Time Commitment */}
              <div className="space-y-4">
                <Label htmlFor="timeCommitment" className="text-lg font-semibold text-foreground">
                  How much time can you dedicate to learning? (Optional)
                </Label>
                <Input
                  id="timeCommitment"
                  placeholder="e.g., 2-3 hours per day, weekends only, etc."
                  value={formData.timeCommitment}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeCommitment: e.target.value }))}
                />
              </div>

              {/* Career Goals */}
              <div className="space-y-4">
                <Label htmlFor="careerGoals" className="text-lg font-semibold text-foreground">
                  What are your career goals? (Optional)
                </Label>
                <Textarea
                  id="careerGoals"
                  placeholder="e.g., I want to become a full-stack developer at a tech company, work remotely, contribute to open source..."
                  value={formData.careerGoals}
                  onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="lg"
              disabled={!isFormValid}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get My Recommendations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssessmentForm;