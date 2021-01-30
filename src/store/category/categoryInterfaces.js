export class Category {
    id;

    constructor(id) {
        this.id = id;
    }
}

export class UpdateUserCategories {
    categoryList;

    constructor(categoryList) {
        this.categoryList = categoryList;
    }
}
