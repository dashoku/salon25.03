import { makeAutoObservable } from "mobx";

export default class CategorySalon {
    constructor() {
        this.categories = [];
        this.selectedCategory = {};
        this.page = 1;
        this.totalCount = 0;
        this.limit = 10; 
        makeAutoObservable(this);
    }

    setCategories(categories) {
        this.categories = categories;
    }

    setSelectedCategory(category) {
        this.selectedCategory = category;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalCount(count) {
        this.totalCount = count;
    }
}