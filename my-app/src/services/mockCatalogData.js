import categoriesData from '../mock/categories.json';
import categoryItemsData from '../mock/category_items.json';
import itemsData from '../mock/items.json';

const MockCatalogData = {
  getCategories: () => {
    const toWrap = categoriesData.map(({ pk, name }) => ({ pk, name }));
    return { message: toWrap };
  },

  getProductsByCategory: (categoryId) => {
    const items = categoryItemsData[categoryId];
    return { message: items || [] };
  },

  getItemData: (itemId) => {
    const itemData = itemsData[itemId];
    return { message: itemData || {}}
  }
};

export default MockCatalogData;
