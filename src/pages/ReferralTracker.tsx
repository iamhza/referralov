
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, Clock, FileText, MessageSquare, 
  CalendarClock, AlertTriangle, Users, CheckCheck
} from 'lucide-react';

interface ReferralTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: string;
}

interface ReferralNote {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

interface ReferralDocument {
  id: string;
  name: string;
  type: string;
  uploaded: string;
  size: string;
}

const ReferralTracker = () => {
  const { referralId } = useParams();
  const { toast } = useToast();
  const [currentStage, setCurrentStage] = useState('selected');
  const [tasks, setTasks] = useState<ReferralTask[]>([
    { 
      id: '1', 
      title: 'Provider to confirm acceptance', 
      completed: true,
      dueDate: '2023-09-15',
      assignedTo: 'Provider'
    },
    { 
      id: '2', 
      title: 'Schedule initial assessment', 
      completed: false,
      dueDate: '2023-09-22',
      assignedTo: 'Provider'
    },
    { 
      id: '3', 
      title: 'Client consent forms submitted', 
      completed: false,
      dueDate: '2023-09-20',
      assignedTo: 'Case Manager'
    },
    { 
      id: '4', 
      title: 'Complete initial assessment', 
      completed: false,
      dueDate: '2023-09-30',
      assignedTo: 'Provider'
    },
    { 
      id: '5', 
      title: 'Create service plan', 
      completed: false,
      dueDate: '2023-10-05',
      assignedTo: 'Provider'
    }
  ]);

  const notes: ReferralNote[] = [
    {
      id: '1',
      content: 'Provider has confirmed they can accept this referral. Waiting on scheduling.',
      author: 'System',
      timestamp: '2023-09-15 09:30 AM'
    },
    {
      id: '2',
      content: 'Client has specific availability constraints - only available after 3pm on weekdays.',
      author: 'Case Manager',
      timestamp: '2023-09-15 10:15 AM'
    },
    {
      id: '3',
      content: 'We have availability on Thursday afternoons. Will reach out to schedule.',
      author: 'Provider',
      timestamp: '2023-09-15 11:45 AM'
    }
  ];

  const documents: ReferralDocument[] = [
    {
      id: '1',
      name: 'Client Information Form',
      type: 'PDF',
      uploaded: '2023-09-15',
      size: '420 KB'
    },
    {
      id: '2',
      name: 'Consent for Treatment',
      type: 'PDF',
      uploaded: '2023-09-15',
      size: '285 KB'
    },
    {
      id: '3',
      name: 'Insurance Verification',
      type: 'PDF',
      uploaded: '2023-09-15',
      size: '350 KB'
    }
  ];

  // Toggle task completion
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));

    const task = tasks.find(t => t.id === taskId);
    
    if (task && !task.completed) {
      toast({
        title: "Task Completed",
        description: `"${task.title}" has been marked as complete.`,
      });

      // If this was the "Schedule initial assessment" task, move to In Progress
      if (task.title === 'Schedule initial assessment' && currentStage === 'selected') {
        setTimeout(() => {
          setCurrentStage('in-progress');
          toast({
            title: "Referral Status Updated",
            description: "Referral has moved to In Progress status.",
          });
        }, 1500);
      }
    }
  };

  // Stages for the referral progress
  const stages = [
    { id: 'pending', label: 'Pending Match', icon: Clock },
    { id: 'matched', label: 'Provider Matched', icon: Users },
    { id: 'selected', label: 'Provider Selected', icon: CheckCircle },
    { id: 'in-progress', label: 'In Progress', icon: FileText },
    { id: 'completed', label: 'Completed', icon: CheckCheck }
  ];

  // Helper to determine if a stage is active, completed, or upcoming
  const getStageStatus = (stageId: string) => {
    const stageOrder = ['pending', 'matched', 'selected', 'in-progress', 'completed'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with Referral Information */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Referral Tracker</h1>
                  <p className="text-gray-600 mt-1">
                    Referral #{referralId} • Mental Health Services • Urgent
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Export Details
                  </Button>
                  <Button className="bg-referra-500 hover:bg-referra-600 gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message Provider
                  </Button>
                </div>
              </div>
              
              {/* Client and Provider Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Client Information</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>Maria Johnson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">DOB:</span>
                      <span>05/12/1985</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insurance:</span>
                      <span>Medicaid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preferred Contact:</span>
                      <span>Phone (Afternoon)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Selected Provider</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>Minnesota Care Center</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span>Mental Health Therapy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Provider Contact:</span>
                      <span>Dr. Susan Chen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span>(612) 555-1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Progress Tracker */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b p-4">
              <h2 className="text-lg font-semibold">Referral Progress</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="w-full max-w-4xl mx-auto">
                  <div className="relative">
                    {/* Progress line */}
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200"></div>
                    
                    {/* Stages */}
                    <div className="relative flex justify-between">
                      {stages.map((stage, index) => {
                        const status = getStageStatus(stage.id);
                        return (
                          <div key={stage.id} className="flex flex-col items-center">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                                status === 'completed' ? 'bg-green-500 text-white' :
                                status === 'current' ? 'bg-referra-500 text-white' :
                                'bg-gray-100 text-gray-400'
                              }`}
                            >
                              <stage.icon className="h-5 w-5" />
                            </div>
                            <div className="text-xs text-center mt-2 w-24">
                              {stage.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Current stage description */}
                  <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h3 className="font-medium text-blue-800">Current Stage: Provider Selected</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      The provider has been selected and notified about this referral. They will review the details
                      and confirm their ability to serve the client. The next step is to schedule the initial assessment.
                    </p>
                  </div>
                  
                  {/* Alert for urgent referrals */}
                  {true && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800">Urgent Referral</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          This is flagged as an urgent referral. The target for initial assessment is within 72 hours.
                          Current estimated waiting time: 48 hours.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tasks, Notes, Documents Tabs */}
          <Card className="border-none shadow-sm overflow-hidden">
            <Tabs defaultValue="tasks">
              <div className="border-b">
                <TabsList className="ml-4 mt-2">
                  <TabsTrigger value="tasks" className="rounded-t-lg">Tasks</TabsTrigger>
                  <TabsTrigger value="notes" className="rounded-t-lg">Notes & Updates</TabsTrigger>
                  <TabsTrigger value="documents" className="rounded-t-lg">Documents</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Tasks Tab */}
              <TabsContent value="tasks" className="p-0 m-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3">
                        <Checkbox 
                          id={`task-${task.id}`} 
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`task-${task.id}`}
                            className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}
                          >
                            {task.title}
                          </label>
                          <div className="flex items-center gap-3 mt-1 text-sm">
                            {task.dueDate && (
                              <div className="flex items-center text-gray-500">
                                <CalendarClock className="h-3.5 w-3.5 mr-1" />
                                Due: {task.dueDate}
                              </div>
                            )}
                            {task.assignedTo && (
                              <div className="flex items-center text-gray-500">
                                <Users className="h-3.5 w-3.5 mr-1" />
                                Assigned to: {task.assignedTo}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge 
                          className={`${task.completed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                        >
                          {task.completed ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-6 bg-referra-500 hover:bg-referra-600">
                    Add New Task
                  </Button>
                </CardContent>
              </TabsContent>
              
              {/* Notes Tab */}
              <TabsContent value="notes" className="p-0 m-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{note.author}</span>
                          <span className="text-sm text-gray-500">{note.timestamp}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <textarea 
                      className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-referra-400"
                      placeholder="Add a new note or update..."
                      rows={3}
                    ></textarea>
                    <Button className="mt-3 bg-referra-500 hover:bg-referra-600">
                      Post Note
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents" className="p-0 m-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded">
                            <FileText className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              {doc.type} • {doc.size} • Uploaded {doc.uploaded}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-6 bg-referra-500 hover:bg-referra-600">
                    Upload Document
                  </Button>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralTracker;
