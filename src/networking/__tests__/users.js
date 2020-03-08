import UserAPI from "../users";

const name="Abidemi Fatima", email="abidemifatima@gmail.com", password="Abidemi2020";
const authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiQWJpZGVtaSBGYXRpbWEiLCJlbWFpbCI6ImFiaWRlbWlmYXRpbWFAZ21haWwuY29tIiwiaWF0IjoxNTgzNjczNDc1LCJleHAiOjE1ODM2NzcwNzV9.eikTvtJNFC14iCkoSgyz8hkDsSmBWzndNh7kRipCHmU";

it("expects user to be registered", async () => {
    const res = await UserAPI.registerUser(name, email, password);
    console.log("Register Response =>", res);
    expect(res.status).toBe(200);
});

it("expects user to be logged in", async () => {
    const res = await UserAPI.loginUser(email, password);
    console.log("Login Response =>", res);
    expect(res.status).toBe(200);
});

it("expects user to be authenticated", async () => {
    const res = await UserAPI.authUser(authKey);
    console.log("Login Response =>", res);
    expect(res.status).toBe(200);
});