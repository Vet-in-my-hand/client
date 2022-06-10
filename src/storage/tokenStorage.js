const key = "userToken"

export class Token {
    constructor(uid) {
        this.id = uid
    }

    save() {
        localStorage.setItem(key, this.id)
    }

    getId() {
        return localStorage.getItem(key)
    }

    clear() {
        localStorage.clear();
    }
}