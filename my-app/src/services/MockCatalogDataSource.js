import MockCatalogData from "./mockCatalogData";

export class MockCatalogDataSource {

  async getEnv() {
    return "test";
  }

  async getCategoryData(categoryId) {
    const response = MockCatalogData.getCategoryData(categoryId);
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

