import MockCatalogData from "./mockCatalogData";

export class MockCatalogDataSource {

  async getEnv() {
    return "prod";
  }

  async getProductsByCategory(categoryId) {
    const response = MockCatalogData.getProductsByCategory(categoryId);
    console.log(response.Message);
    return response.message || [];
  }

  async getCategories() {
    const response = MockCatalogData.getCategories();
    console.log(response.Message);
    return response.message || [];
  }

  async getItemData(itemId) {
    const response = MockCatalogData.getItemData(itemId);
    console.log(response.Message);
    return response.message || null;
  }
}

