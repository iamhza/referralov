
import { toast } from "@/components/ui/use-toast";

// AWS API configuration
const API_URL = import.meta.env.VITE_AWS_API_URL || "";

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
  activeReferrals: number;
  lastUpdated: string;
}

/**
 * AWS API client service for making authenticated requests
 */
export const awsApiClient = {
  /**
   * Fetch clients from AWS API
   */
  async getClients(): Promise<ApiResponse<ClientData[]>> {
    try {
      if (!API_URL) {
        console.error("AWS API URL not configured");
        return { success: false, error: "API URL not configured. Please add VITE_AWS_API_URL to your environment." };
      }
      
      // In a real implementation, you would add your AWS authentication headers here
      // This could be AWS Signature V4 signing or using an API key
      const response = await fetch(`${API_URL}/clients`, {
        headers: {
          // Example headers - replace with your actual auth method
          "Content-Type": "application/json",
          // "x-api-key": apiKey, 
          // OR use AWS Signature V4 authentication
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  },

  /**
   * Get a single client by ID
   */
  async getClient(id: string): Promise<ApiResponse<ClientData>> {
    try {
      if (!API_URL) {
        console.error("AWS API URL not configured");
        return { success: false, error: "API URL not configured" };
      }
      
      const response = await fetch(`${API_URL}/clients/${id}`, {
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Failed to fetch client ${id}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  },

  /**
   * Create a new client
   */
  async createClient(clientData: Omit<ClientData, 'id' | 'lastUpdated' | 'activeReferrals'>): Promise<ApiResponse<ClientData>> {
    try {
      if (!API_URL) {
        console.error("AWS API URL not configured");
        return { success: false, error: "API URL not configured" };
      }
      
      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Failed to create client:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  },

  /**
   * Update an existing client
   */
  async updateClient(id: string, clientData: Partial<ClientData>): Promise<ApiResponse<ClientData>> {
    try {
      if (!API_URL) {
        console.error("AWS API URL not configured");
        return { success: false, error: "API URL not configured" };
      }
      
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Failed to update client ${id}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  },

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<ApiResponse<void>> {
    try {
      if (!API_URL) {
        console.error("AWS API URL not configured");
        return { success: false, error: "API URL not configured" };
      }
      
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error(`Failed to delete client ${id}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }
};
