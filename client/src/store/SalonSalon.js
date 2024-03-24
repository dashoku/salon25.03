import { makeAutoObservable } from "mobx";

export default class SalonSalon {
    constructor() {
        this.salons = [];
        this.selectedSalon = {};
        this.page = 1;
        this.totalCount = 0;
        this.limit = 10; 
        makeAutoObservable(this);
    }

    setCategories(salons) {
        this.salons = salons;
    }

    setSelectedCategory(salon) {
        this.selectedSalon = salon;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalCount(count) {
        this.totalCount = count;
    }
}