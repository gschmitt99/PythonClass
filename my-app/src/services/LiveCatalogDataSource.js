import { getItemData, getCategories, getProductsByCategory, getEnv } from "../services/catalogAPI";

export class LiveCatalogDataSource {

  async getEnv() {
    return await getEnv();
  }

  async getCategories() {
    return await getCategories();
  }

  async getProductsByCategory(categoryId) {
    return await getProductsByCategory(categoryId);
  }

  async getItemData(itemId) {
    return await getItemData(itemId);
  }

}
