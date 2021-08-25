import httpService from "./httpService";
const apiendpoint = "http://localhost:3900/api/user";

export function getuser() {
  return httpService.get(apiendpoint);
}

export function deleteuser(id) {
  return httpService.delete(apiendpoint + "/" + id);
}

export function registeruser(input) {
  return httpService.post(apiendpoint, {
    username: input.username,
    mobile_no: input.mobile_no,
    email: input.email,
    address: input.address,
  });
}
