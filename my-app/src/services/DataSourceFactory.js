import { MockCatalogDataSource } from "./MockCatalogDataSource";
import { LiveCatalogDataSource } from "./LiveCatalogDataSource";

export function createCatalogDataSource(env) {
  if (env === "mock") return new MockCatalogDataSource();
  return new LiveCatalogDataSource();
}
