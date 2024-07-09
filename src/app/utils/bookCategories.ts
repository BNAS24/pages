// utils/generateResponse.ts
export const generateResponse = (categories: string[], filteredData: any[]): Record<string, any[]> => {
    const response: Record<string, any[]> = {};
    categories.forEach((category, index) => {
      response[category] = filteredData[index];
    });
    return response;
  };
  