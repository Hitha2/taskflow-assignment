import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const getBoard = async () => {
    const response = await api.get("/board");
    return response.data;
};

export const createTask = async (task) => {
    const response = await api.post("/tasks", task);
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

export const moveTask = async (id, columnId) => {
    const response = await api.patch(
        `/tasks/${id}/move`,
        { columnId }
    );

    return response.data;
};

export default api;