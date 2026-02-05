export class MongoQueryBuilder {
  private query: Record<
    string,
    object | string | number | boolean | Date | null
  > = {};
  private sort: Record<string, 1 | -1> = {};
  private limit?: number;
  private page?: number;

  addFilter(
    path: string,
    value: object | string | number | boolean | Date | null | undefined,
    operator: string = '$eq',
  ) {
    if (value === undefined) return this;

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

  addSort(field: string | undefined) {
    if (!field) return this;

    const isDesc = field.startsWith('-');
    const cleanField = isDesc ? field.substring(1) : field;

    this.sort[cleanField] = isDesc ? -1 : 1;

    return this;
  }

  addSorts(fields: string[] | undefined) {
    if (!fields) return this;

    for (const field of fields) {
      this.addSort(field);
    }

    return this;
  }

  addLimit(limit?: number) {
    if (!limit || limit <= 0) return this;
    this.limit = limit;

    return this;
  }

  setPage(page?: number) {
    if (!page || page <= 0) return this;
    this.page = page;

    return this;
  }

  build() {
    return {
      query: this.query,
      options: {
        sort: this.sort,
        limit: this.limit,
        skip:
          this.sort && this.page && this.limit
            ? (this.page - 1) * this.limit
            : undefined,
      },
    };
  }
}
