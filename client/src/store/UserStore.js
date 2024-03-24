import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {
            name: '',
            surname: '',
            phone: '',
            email: ''
        };
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setUserProfile(userData) {
        this._user = userData;
    }

    async loadProfile() {
        try {
            const response = await fetch('/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Ошибка загрузки профиля');
            }
            const userData = await response.json();
            this.setUser(userData);
        } catch (error) {
            console.error('Ошибка загрузки профиля:', error.message);
        }
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}
