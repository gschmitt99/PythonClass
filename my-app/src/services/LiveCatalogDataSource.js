import { getItemData, getCategories, getCategoryData, getEnv } from "../services/catalogAPI";

export class LiveCatalogDataSource {

  async getEnv() {
    return await getEnv();
  }

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
