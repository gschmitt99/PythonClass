import { getItemData, getCategories, getCategoryData } from "../services/catalogAPI";

export class LiveCatalogDataSource {

  async getCategories() {
    return await getCategories();
  }

  async getCategoryData(categoryId) {
    return await getCategoryData(categoryId);
  }

  async getItemData(itemId) {
    return await getItemData(itemId);
  }

}
