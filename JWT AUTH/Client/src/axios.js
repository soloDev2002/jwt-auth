import axios from "axios";

const instant = axios.create({
  baseURL: "https://nemesis-jwt-assignment.herokuapp.com",
  // baseURL: "http://localhost:8000",
});

export default instant;
