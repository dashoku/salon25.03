import { makeAutoObservable } from "mobx";

export default class ProcedureSalon {
    constructor() {
        this.cprocedures = [];
        this.selectedProcedure = {};
        this.page = 1;
        this.totalCount = 0;
        this.limit = 10; 
        makeAutoObservable(this);
    }

    setProcedures(procedures) {
        this.procedures = procedures;
    }

    setSelectedProcedure(procedure) {
        this.selectedProcedure = procedure;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalCount(count) {
        this.totalCount = count;
    }
}