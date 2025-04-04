
import React, { useState } from 'react';
import { awsApiClient } from '@/services/awsApiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function ApiTester() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; data?: any; error?: string } | null>(null);
  
  const testApi = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      console.log("Testing API endpoint...");
      const response = await awsApiClient.testApiEndpoint();
      console.log("API response:", response);
      setResult(response);
      
      toast({
        title: response.success ? "API Test Successful" : "API Test Failed",
        description: response.success 
          ? "The API request was successful." 
          : `Error: ${response.error}`,
        variant: response.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Test failed:", error);
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      });
      
      toast({
        title: "API Test Failed",
        description: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>API Endpoint Tester</CardTitle>
        <CardDescription>
          Test your AWS API Gateway endpoint with sample client data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold mb-2">Endpoint:</h3>
            <p className="break-all text-sm">https://qcxg71ospg.execute-api.us-east-2.amazonaws.com/insertClientData</p>
            
            <h3 className="font-semibold mt-4 mb-2">Test Payload:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">
              {JSON.stringify({
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "phone": "1234567890"
              }, null, 2)}
            </pre>
            
            <h3 className="font-semibold mt-4 mb-2">Common Issues:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>CORS policies may be preventing the request</li>
              <li>API Gateway might not have CORS enabled</li>
              <li>API key might be required but not provided</li>
              <li>Network connectivity issues</li>
            </ul>
          </div>

          {result && (
            <div className={`p-4 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center mb-2">
                {result.success ? 
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> : 
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                }
                <h3 className="font-semibold">Response:</h3>
              </div>
              <pre className={`p-4 rounded text-sm overflow-auto ${result.success ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={testApi} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Testing..." : "Test API Endpoint"}
        </Button>
      </CardFooter>
    </Card>
  );
}
