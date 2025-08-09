//const BASE_URL = "https://phoenix2025:5000";
const BASE_URL = "http://localhost:5000";

/**
 * Fetch category names and ids
 * @returns {Promise<Object>} API response with items
 */
export const getCategories = async () => {
  try {
    const url = `${BASE_URL}/data`;
    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("getCategoryData error:", error);
    return { items: [] };
  }
};

/**
 * Fetch items for a given category
 * @param {string} categoryName - name or ID of the category
 * @returns {Promise<Object>} API response with items
 */
export const getCategoryData = async (categoryName) => {
  try {
    const url = `${BASE_URL}/categorydata/${categoryName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("getCategoryData error:", error);
    return { items: [] };
  }
};

/**
 * Fetch full details for a specific item
 * @param {string} itemId - unique identifier of the item
 * @returns {Promise<Object>} API response with item details
 */
export const getItemData = async (itemId) => {
  try {
    console.log(`${BASE_URL}/item/${itemId}`);
    const response = await fetch(`${BASE_URL}/item/${itemId}`);
    if (!response.ok) throw new Error("Failed to fetch item details");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("getItemData error:", error);
    return null;
  }
};
