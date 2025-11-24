import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Mail, Target, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleContinueLearning = () => {
    // Navigate back to index, which will auto-load the roadmap for locked domain
    navigate('/');
  };

  if (!user) {
    return null;
  }

  // Calculate progress percentage (dummy for now)
  const progressPercentage = user.selectedDomain ? 25 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-1">Continue your learning journey</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Name</span>
                </div>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Path
            </CardTitle>
            <CardDescription>Track your progress and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected Domain</span>
                  {user.selectedDomain ? (
                    <Badge variant="default" className="bg-primary/20 text-primary border border-primary/30">
                      <span>{user.selectedDomain}</span>
                      <span className="ml-2">🔒</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not selected yet</Badge>
                  )}
                </div>
                
                {user.selectedDomain && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-2">
                    <p className="text-xs text-primary font-semibold mb-1">
                      🖤 PICK ONE. MASTER IT!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your domain is locked. Focus on mastering {user.selectedDomain}.
                    </p>
                  </div>
                )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleContinueLearning} 
              className="w-full"
              size="lg"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </CardContent>
        </Card>

        {/* Coming Soon Card */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Coming Soon</CardTitle>
            <CardDescription>Exciting features on the way</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <Button variant="outline" disabled className="h-20 flex-col">
                <span className="font-medium">AI Chatbot</span>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              </Button>
              <Button variant="outline" disabled className="h-20 flex-col">
                <span className="font-medium">Resume Builder</span>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              </Button>
              <Button variant="outline" disabled className="h-20 flex-col">
                <span className="font-medium">Job Finder</span>
                <span className="text-xs text-muted-foreground">Coming Soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
