// utils/fetchData.ts
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
};

export default fetchData;