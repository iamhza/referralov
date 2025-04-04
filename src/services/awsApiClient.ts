
// AWS API configuration
const API_URL = import.meta.env.VITE_AWS_API_URL || "";
const API_KEY = import.meta.env.VITE_AWS_API_KEY || "";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ClientData {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed' | 'urgent';
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  notes?: string;
  dateOfBirth?: string;
  accessibilityNeeds?: string[];
  insuranceType?: string;
  medicalNotes?: string;
  serviceId?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  culturalNeeds?: string;
  languagePreferences?: string[];
  caseManagerId?: string;
  caseManagerName?: string;
  organization?: string;
  activeReferrals: number;
  lastUpdated: string;
  first_name?: string;
  last_name?: string;
}

/**
 * Helper function to make authenticated requests to the AWS API Gateway
 */
async function makeApiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body?: any
): Promise<ApiResponse<T>> {
  try {
    if (!API_URL && !endpoint.startsWith('http')) {
      console.error("AWS API URL not configured");
      return { success: false, error: "API URL not configured. Please add VITE_AWS_API_URL to your environment." };
    }
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    // Add API key if available
    if (API_KEY) {
      headers["x-api-key"] = API_KEY;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include cookies for sessions if used
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }
    
    // Make the API request
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    console.log(`Making ${method} request to: ${url}`);
    
    const response = await fetch(url, requestOptions);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    // Parse the response as JSON
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API request failed: ${error}`);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
}

/**
 * AWS API client service for making authenticated requests to API Gateway
 */
export const awsApiClient = {
  /**
   * Fetch clients from AWS API
   */
  async getClients(): Promise<ApiResponse<ClientData[]>> {
    return await makeApiRequest<ClientData[]>('/clients');
  },

  /**
   * Get a single client by ID
   */
  async getClient(id: string): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>(`/clients/${id}`);
  },

  /**
   * Create a new client
   */
  async createClient(clientData: Omit<ClientData, 'id' | 'lastUpdated' | 'activeReferrals'>): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>('/clients', 'POST', clientData);
  },

  /**
   * Update an existing client
   */
  async updateClient(id: string, clientData: Partial<ClientData>): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>(`/clients/${id}`, 'PUT', clientData);
  },

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<ApiResponse<void>> {
    return await makeApiRequest<void>(`/clients/${id}`, 'DELETE');
  },
  
  /**
   * Test the AWS API with sample client data
   */
  async testApiEndpoint(): Promise<ApiResponse<any>> {
    const testEndpoint = "https://qcxg71ospg.execute-api.us-east-2.amazonaws.com/insertClientData";
    const testData = {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890"
    };
    
    return await makeApiRequest<any>(testEndpoint, 'POST', testData);
  }
};
