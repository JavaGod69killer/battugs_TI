import { Admin } from "service/auth/type";
import { PaginationResponse, SuccessResponse } from "types";
import http from "..";

namespace workers {
  export const list = async (): Promise<PaginationResponse<Admin>> => {
    const response = await fetch("http://localhost:8000/api/employee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workers list: ${response.status} ${response.statusText}`);
    }

    const dataResponse = await response.json();
    console.log("✅ API response:", dataResponse);

    if (!dataResponse || !Array.isArray(dataResponse.items)) {
      throw new Error("Invalid response: 'items' must be an array");
    }

    return dataResponse;
  };

  export const createWorkers = async (body: any): Promise<SuccessResponse> => {
    try {
      const response = await fetch("http://localhost:8000/api/employee/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to register worker: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Worker registered successfully:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Error creating worker:", error.message);
      throw error;
    }
  };

  export const updateWorkers = async (id: String, body: any): Promise<SuccessResponse> => {
    console.log("ID being passed:", id);
    console.log("Body being passed:", body);
    try{
      const response = await fetch (`http://localhost:8000/api/employee/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log("Request body:", body);
      console.log("ID being passed:", id);


      if (!response.ok) {
        throw new Error(`Failed to update worker: ${response.status} ${response.statusText}`);
      }


      const data = await response.json();
      console.log("✅ Worker updated successfully:", data);
      return data;
    }catch (error: any) {
      console.error("❌ Error updating worker:", error.message);
      throw error;
    } 
  }
  export const deleteEmploy = (id: number) =>
    http.del<SuccessResponse>(`/user/delete/${id}`, {
      hasAuth: true,
    });
}

export default workers;
