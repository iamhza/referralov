
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ReferralFormProps {
  onComplete?: () => void;
}

export const ReferralForm = ({ onComplete }: ReferralFormProps) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalSteps = 4;
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Referral Submitted Successfully",
        description: "Your referral has been submitted and is being processed. You'll be redirected to provider matching.",
      });
      setTimeout(() => {
        navigate('/providers');
      }, 1500);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card overflow-hidden">
      {/* Progress Bar */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Create New Referral</h2>
          <div className="text-sm text-gray-500">Step {step} of {totalSteps}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-referra-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-6 sm:p-8">
        {/* Step 1: Service Request Basics */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 1
              </div>
              <h3 className="text-lg font-semibold">Service Request Basics</h3>
              <p className="text-gray-500 mt-1">Tell us what service you need for your client</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">What service is needed?</Label>
                <Select defaultValue="mental-health">
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mental-health">Mental Health Services</SelectItem>
                    <SelectItem value="housing">Housing Assistance</SelectItem>
                    <SelectItem value="healthcare">Healthcare Services</SelectItem>
                    <SelectItem value="employment">Employment Support</SelectItem>
                    <SelectItem value="education">Educational Resources</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="legal">Legal Services</SelectItem>
                    <SelectItem value="food">Food Assistance</SelectItem>
                    <SelectItem value="substance">Substance Use Treatment</SelectItem>
                    <SelectItem value="financial">Financial Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Urgency of the request?</Label>
                <RadioGroup defaultValue="medium" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Client Information & Demographics */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 2
              </div>
              <h3 className="text-lg font-semibold">Client Information & Demographics</h3>
              <p className="text-gray-500 mt-1">Details needed to match with appropriate providers</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Full Name</Label>
                  <Input id="clientName" defaultValue="Maria Johnson" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Gender Preference for Provider?</Label>
                <RadioGroup defaultValue="no-preference" className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference" />
                    <Label htmlFor="no-preference">No Preference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Language Preferences</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {['English', 'Spanish', 'Somali', 'Hmong', 'Arabic'].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox id={`language-${language.toLowerCase()}`} defaultChecked={language === 'English'} />
                      <label
                        htmlFor={`language-${language.toLowerCase()}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Cultural Needs</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="african-american">African American-focused</SelectItem>
                      <SelectItem value="east-african">East African-focused</SelectItem>
                      <SelectItem value="hmong">Hmong-focused</SelectItem>
                      <SelectItem value="latino">Latino-focused</SelectItem>
                      <SelectItem value="native">Native American-focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Insurance Coverage</Label>
                  <Select defaultValue="medicaid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="private">Private Insurance</SelectItem>
                      <SelectItem value="self-pay">Self-Pay</SelectItem>
                      <SelectItem value="sliding-scale">Sliding Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Accessibility Needs</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {['Wheelchair', 'Autism Support', 'Hearing Impaired', 'Visual Impaired', 'Sensory Needs'].map((need) => (
                    <div key={need} className="flex items-center space-x-2">
                      <Checkbox id={`need-${need.toLowerCase().replace(' ', '-')}`} />
                      <label
                        htmlFor={`need-${need.toLowerCase().replace(' ', '-')}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {need}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Transportation Required?</Label>
                <RadioGroup defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="transport-yes" />
                    <Label htmlFor="transport-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="transport-no" />
                    <Label htmlFor="transport-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Provider Matching Preferences */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 3
              </div>
              <h3 className="text-lg font-semibold">Provider Matching Preferences</h3>
              <p className="text-gray-500 mt-1">Help us find the right providers for your client</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Provider Type</Label>
                <RadioGroup defaultValue="no-preference" className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="provider-no-preference" />
                    <Label htmlFor="provider-no-preference">No Preference</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="provider-small" />
                    <Label htmlFor="provider-small">Small Provider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="provider-large" />
                    <Label htmlFor="provider-large">Large Provider</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nonprofit" id="provider-nonprofit" />
                    <Label htmlFor="provider-nonprofit">Nonprofit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faith-based" id="provider-faith-based" />
                    <Label htmlFor="provider-faith-based">Faith-based</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Best Days/Times for Service</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {['Weekdays', 'Evenings', 'Weekends', 'Flexible'].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox id={`time-${time.toLowerCase()}`} defaultChecked={time === 'Flexible'} />
                      <label
                        htmlFor={`time-${time.toLowerCase()}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Emergency or After-Hours Services Needed?</Label>
                <RadioGroup defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="emergency-yes" />
                    <Label htmlFor="emergency-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="emergency-no" />
                    <Label htmlFor="emergency-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 rounded-lg bg-referra-50 border border-referra-200">
                <div className="flex items-center mb-2">
                  <Checkbox id="availability" />
                  <label
                    htmlFor="availability"
                    className="text-sm font-medium ml-2 text-gray-900"
                  >
                    Show providers with available capacity
                  </label>
                </div>
                <p className="text-xs text-gray-600 ml-6">
                  Only show providers that have confirmed available capacity to accept new clients
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50 border">
                <h4 className="font-medium mb-2">Provider Availability</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High</Badge>
                    <span className="text-sm">14 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                    <span className="text-sm">8 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Low</Badge>
                    <span className="text-sm">5 providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>
                    <span className="text-sm">3 providers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Contact & Follow-Up */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-referra-50 text-referra-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                Step 4
              </div>
              <h3 className="text-lg font-semibold">Contact & Follow-Up</h3>
              <p className="text-gray-500 mt-1">Your information for provider communications</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="managerName">Case Manager Name</Label>
                  <Input id="managerName" defaultValue="Case Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization Name</Label>
                  <Input id="organization" defaultValue="Community Support Agency" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="manager@agency.org" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(612) 555-0123" />
                </div>
              </div>
              
              <div className="border-t pt-6 mt-8">
                <div className="p-4 mb-6 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Ready for Provider Matching</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Based on your selections, we've identified 27 potential provider matches for this referral.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Referral Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Needed:</span>
                      <span>Mental Health Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Urgency:</span>
                      <span>Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Client:</span>
                      <span>Maria Johnson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insurance:</span>
                      <span>Medicaid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Form Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <Button 
            onClick={nextStep}
            className="bg-referra-500 hover:bg-referra-600 transition-colors flex items-center gap-2"
          >
            <span>{step === totalSteps ? 'Submit Referral' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;
