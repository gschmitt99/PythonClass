// harvestCatalog.js
//const fetch = require("node-fetch");
const fs = require("fs/promises");

const BASE_URL = "http://phoenix2025:5000";

async function dynamicFetch(...args) {
  const fetchModule = await import("node-fetch");
  return fetchModule.default(...args);
}

async function fetchJson(url) {
  try {
    const response = await dynamicFetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${url}`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function harvestCatalog() {
  const categories = await fetchJson(`${BASE_URL}/data`);
  if (!categories) return;

  await fs.writeFile("categories.json", JSON.stringify(categories, null, 2));
  console.log("✅ Saved categories.json");

  const categoryItems = {};
  const allItemsMap = {};
  const normalizedCategories = categories.map(entry => {
    const [pk, name] = Object.entries(entry)[0];
    return { pk, name };
  });

console.log(normalizedCategories);
  for (const {pk, name} of normalizedCategories || []) {
    console.log("getting category: ", pk, name);
    const categoryData = await fetchJson(`${BASE_URL}/categorydata/${pk}`);
    if (!categoryData) continue;

    console.log("categoryData=", categoryData);
    categoryItems[pk] = categoryData.items;
    console.log(`📦 Category: ${name} — ${categoryData.items.length} items`);

    for (const item of categoryData.items || []) {
      const itemId = item.pk;
      const itemDetail = await fetchJson(`${BASE_URL}/item/${itemId}`);
      if (itemDetail) {
        allItemsMap[itemId] = itemDetail;
      }
    }
  }

  await fs.writeFile("categoryItems.json", JSON.stringify(categoryItems, null, 2));
  console.log("✅ Saved categoryItems.json");

  await fs.writeFile("items.json", JSON.stringify(allItemsMap, null, 2));
  console.log("✅ Saved items.json");
}

harvestCatalog();
