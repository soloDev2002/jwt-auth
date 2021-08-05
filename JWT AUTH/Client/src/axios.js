import axios from "axios";

const instant = axios.create({
  baseURL: "https://nemesis-jwt-assignment.herokuapp.com",
});

export default instant;
