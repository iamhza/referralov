
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [userType, setUserType] = useState('case-manager');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes - simulate registration
      setTimeout(() => {
        // In a real app, this would be a Supabase auth call
        toast({
          title: "Account created successfully",
          description: "Welcome to Referra!",
        });
        
        // Redirect based on user type
        if (userType === 'provider') {
          navigate('/provider');
        } else {
          navigate('/case-manager');
        }
      }, 1000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-referra-500 text-white p-1.5 rounded">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-xl font-semibold">Referra</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Join Referra to simplify your referral process
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input 
                  id="organization" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Your company or organization"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup 
                  defaultValue="case-manager" 
                  value={userType}
                  onValueChange={setUserType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="case-manager" id="case-manager" />
                    <Label htmlFor="case-manager">Case Manager</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider">Service Provider</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  className="mt-1"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => 
                    setAgreeTerms(checked as boolean)
                  }
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-tight"
                >
                  I agree to the{' '}
                  <a href="#" className="text-referra-600 hover:text-referra-700">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-referra-600 hover:text-referra-700">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-referra-500 hover:bg-referra-600"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account?</span>{' '}
              <Link 
                to="/signin" 
                className="font-medium text-referra-600 hover:text-referra-700"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
