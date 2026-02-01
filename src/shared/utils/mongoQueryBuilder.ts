export class MongoQueryBuilder {
  private query: Record<string, object | string | number> = {};

  addFilter(
    path: string,
    value: object | string | number | undefined,
    operator: string = '$eq',
  ) {
    if (!value) return this;

    if (operator === '$eq') {
      this.query[path] = value;
    } else {
      const existing =
        typeof this.query[path] === 'object' ? this.query[path] : {};

      this.query[path] = {
        ...existing,
        [operator]: value,
      };
    }

    return this;
  }

  addSearch(path: string, value: string | undefined) {
    if (!value) return this;

    this.query[path] = { $regex: value, $options: 'i' };

    return this;
  }

  build() {
    return this.query;
  }
}
