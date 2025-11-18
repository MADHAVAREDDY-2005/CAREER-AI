// ============================================
// AUTHENTICATION MANAGER
// Simple email/password authentication
// ============================================

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import { saveAuth, clearAuth } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

interface AuthManagerProps {
  onAuthSuccess: () => void;
}

const AuthManager = ({ onAuthSuccess }: AuthManagerProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple validation
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    // Check if user exists in localStorage (for demo purposes)
    const storedUser = localStorage.getItem(`user_${email}`);
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        saveAuth(email, userData.userId);
        toast({
          title: 'Welcome back!',
          description: 'Successfully logged in'
        });
        onAuthSuccess();
      } else {
        toast({
          title: 'Error',
          description: 'Incorrect password',
          variant: 'destructive'
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'User not found. Please sign up first.',
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple validation
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    // Check if user already exists
    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      toast({
        title: 'Error',
        description: 'User already exists. Please login.',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    // Create new user
    const userId = `user_${Date.now()}`;
    const userData = {
      email,
      password,
      userId,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
    saveAuth(email, userId);

    toast({
      title: 'Account created!',
      description: 'Welcome to AI Career Recommender'
    });

    onAuthSuccess();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--gradient-hero)' }}>
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Career Recommender</h1>
          <p className="text-muted-foreground">Sign in to start your learning journey</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <LogIn className="w-4 h-4 mr-2" />
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <UserPlus className="w-4 h-4 mr-2" />
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthManager;
