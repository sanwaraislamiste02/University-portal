import API from "./Api";

export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);