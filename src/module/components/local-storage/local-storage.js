

class LocalStorage {
    constructor() {
        this.STORAGE_KEY = 'test-storage'
    }

    fetch() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    }

    save(todos) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }

    getNoq() {
        var data = this.fetch();
        return data[0].assessment.questions.length;
    }
}

export default LocalStorage;