import { $authHost, $host } from './index';

// Category
export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/category', category);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await $host.get('api/category');
    return data;
};

export const fetchOneCategory = async (id) => {
    const {data} = await $host.get('api/category/' + id)
    return data
}

export const updateCategory = async (categoryId, categoryData) => {
    const { data } = await $authHost.put(`api/category/${categoryId}`, categoryData);
    return data;
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await $authHost.delete(`api/category/${categoryId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Запрос отправлен, сервер ответил с ошибкой статуса
            console.error('Ошибка при удалении категории:', error.response.data);
            throw new Error(`Помилка при видаленні категорії: ${error.response.data.message}`);
        } else if (error.request) {
            // Запрос отправлен, но нет ответа
            console.error('Ошибка при отправке запроса:', error.request);
            throw new Error('Помилка при видаленні категорії: Немає відповіді від сервера');
        } else {
            // Что-то пошло не так при настройке запроса
            console.error('Ошибка настройки запроса:', error.message);
            throw new Error('Помилка при видаленні категорії: Щось пішло не так');
        }
    }
};


export const getCategoryById = async (categoryId) => {
    const { data } = await $host.get(`api/category/${categoryId}`);
    return data;
};


// Procedure
export const createProcedure = async (procedure) => {
    const { data } = await $authHost.post('api/procedure', procedure);
    return data;
};

export const fetchProcedures = async (categoryId, page, limit = 5) => {
    const { data } = await $host.get('api/procedure', {
        params: { categoryId, page, limit }
    });
    return data;
};

export const fetchOneProcedure = async (id) => {
    const { data } = await $host.get(`api/procedure/${id}`);
    return data;
};

export const updateProcedure = async (procedureId, procedureData) => {
    const { data } = await $authHost.put(`api/procedure/${procedureId}`, procedureData);
    return data;
};

export const deleteProcedure = async (procedureId) => {
    try {
        const response = await $authHost.delete(`api/procedure/${procedureId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Запрос отправлен, сервер ответил с ошибкой статуса
            console.error('Ошибка при удалении процедуры:', error.response.data);
            throw new Error(`Помилка при видаленні процедури: ${error.response.data.message}`);
        } else if (error.request) {
            // Запрос отправлен, но нет ответа
            console.error('Ошибка при отправке запроса:', error.request);
            throw new Error('Помилка при видаленні процедури: Немає відповіді від сервера');
        } else {
            // Что-то пошло не так при настройке запроса
            console.error('Ошибка настройки запроса:', error.message);
            throw new Error('Помилка при видаленні процедури: Щось пішло не так');
        }
    }
};


// Discount
export const createDiscount = async (discount) => {
    try {
        const { data } = await $authHost.post('api/discount', discount);
        return data;
    } catch (error) {
        console.error('Error creating discount:', error);
        throw new Error('Failed to create discount. Please try again.');
    }
};

export const fetchDiscounts = async () => {
    try {
        const { data } = await $host.get('api/discount');
        return data;
    } catch (error) {
        console.error('Error fetching discounts:', error);
        throw new Error('Failed to fetch discounts. Please try again.');
    }
};

export const updateDiscount = async (discountId, discountData) => {
    try {
        const { data } = await $authHost.put(`api/discount/${discountId}`, discountData);
        return data;
    } catch (error) {
        console.error('Error updating discount:', error);
        throw new Error('Failed to update discount. Please try again.');
    }
};

export const deleteDiscount = async (discountId) => {
    try {
        const response = await $authHost.delete(`api/discount/${discountId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting discount:', error);
        throw new Error('Failed to delete discount. Please try again.');
    }
};

export const getDiscountById = async (discountId) => {
    try {
        const { data } = await $host.get(`api/discount/${discountId}`);
        return data;
    } catch (error) {
        console.error('Error fetching discount by ID:', error);
        throw new Error('Failed to fetch discount. Please try again.');
    }
};

// Salon
export const createSalon = async (salon) => {
    try {
        const { data } = await $authHost.post('api/salon', salon);
        return data;
    } catch (error) {
        console.error('Error creating salon:', error);
        throw new Error('Failed to create salon. Please try again.');
    }
};

export const fetchSalons = async () => {
    try {
        const { data } = await $host.get('api/salon');
        return data;
    } catch (error) {
        console.error('Error fetching salons:', error);
        throw new Error('Failed to fetch salons. Please try again.');
    }
};

export const updateSalon = async (salonId, salonData) => {
    try {
        const { data } = await $authHost.put(`api/salon/${salonId}`, salonData);
        return data;
    } catch (error) {
        console.error('Error updating salon:', error);
        throw new Error('Failed to update salon. Please try again.');
    }
};

export const deleteSalon = async (salonId) => {
    try {
        const response = await $authHost.delete(`api/salon/${salonId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error deleting salon:', error.response.data);
            throw new Error(`Failed to delete salon: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Error sending request:', error.request);
            throw new Error('Failed to delete salon: No response from the server');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Failed to delete salon: Something went wrong');
        }
    }
};


// WorkingHours
export const createWorkingHours = async (workingHours) => {
    const { data } = await $authHost.post('api/working-hours', workingHours);
    return data;
};

export const fetchWorkingHours = async () => {
    const { data } = await $host.get('api/working-hours');
    return data;
};

// Income
export const createIncome = async (income) => {
    const { data } = await $authHost.post('api/income', income);
    return data;
};

export const fetchIncome = async () => {
    const { data } = await $host.get('api/income');
    return data;
};

// Manager
export const createManager = async (manager) => {
    try {
        const { data } = await $authHost.post('api/manager', manager);
        return data;
    } catch (error) {
        console.error('Error creating manager:', error);
        throw new Error('Failed to create manager');
    }
};

export const fetchManagers = async () => {
    try {
        const { data } = await $host.get('api/manager');
        return data;
    } catch (error) {
        console.error('Error fetching managers:', error);
        throw new Error('Failed to fetch managers');
    }
};

export const updateManager = async (managerId, managerData) => {
    try {
        const { data } = await $authHost.put(`api/manager/${managerId}`, managerData);
        return data;
    } catch (error) {
        console.error('Error updating manager:', error);
        throw new Error('Failed to update manager');
    }
};

export const deleteManager = async (managerId) => {
    try {
        const response = await $authHost.delete(`api/manager/${managerId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error deleting manager:', error.response.data);
            throw new Error(`Failed to delete manager: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Error sending request:', error.request);
            throw new Error('Failed to delete manager: No response from the server');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Failed to delete manager: Something went wrong');
        }
    }
};

// Record
export const createRecord = async (record) => {
    const { data } = await $authHost.post('api/record', record);
    return data;
};

export const fetchRecords = async () => {
    const { data } = await $host.get('api/record');
    return data;
};

// Master
export const createMaster = async (master) => {
    const { data } = await $authHost.post('api/master', master);
    return data;
};

export const fetchMasters = async () => {
    const { data } = await $host.get('api/master');
    return data;
};

export const updateMaster = async (masterId, masterData) => {
    const { data } = await $authHost.put(`api/master/${masterId}`, masterData);
    return data;
};

export const deleteMaster = async (masterId) => {
    try {
        const response = await $authHost.delete(`api/master/${masterId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error deleting master:', error.response.data);
            throw new Error(`Failed to delete master: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('Error sending request:', error.request);
            throw new Error('Failed to delete master: No response from the server');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Failed to delete master: Something went wrong');
        }
    }
};

// Expense
export const createExpense = async (expense) => {
    const { data } = await $authHost.post('api/expense', expense);
    return data;
};

export const fetchExpenses = async () => {
    const { data } = await $host.get('api/expense');
    return data;
};

// Client
export const createClient = async (client) => {
    try {
        const { data } = await $authHost.post('api/client', client);
        return data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw new Error('Failed to create client');
    }
};

export const fetchClients = async () => {
    try {
        const { data } = await $host.get('api/client');
        return data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw new Error('Failed to fetch clients');
    }
};

export const updateClient = async (clientId, clientData) => {
    try {
        const { data } = await $authHost.put(`api/client/${clientId}`, clientData);
        return data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw new Error('Failed to update client');
    }
};

export const deleteClient = async (clientId) => {
    try {
        const response = await $authHost.delete(`api/client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting client:', error);
        throw new Error('Failed to delete client');
    }
};

// Review
export const createReview = async (review) => {
    const { data } = await $authHost.post('api/review', review);
    return data;
};

export const fetchReviews = async () => {
    const { data } = await $host.get('api/review');
    return data;
};

// Reminder
export const createReminder = async (reminder) => {
    const { data } = await $authHost.post('api/reminder', reminder);
    return data;
};

export const fetchReminders = async () => {
    const { data } = await $host.get('api/reminder');
    return data;
};
