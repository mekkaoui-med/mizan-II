import { request } from "./api.js";

console.log("app.js is connected!");
async function testAPI() {
  console.log("testAPI is running");

  try {
        console.log("2. Sending request...");

    const articles = await request("/articles");

    console.log(articles);
  } catch (error) {
    console.log("Type:", error.type);
    console.log("Status:", error.status);
    console.log("Message:", error.message);
  }
}

testAPI();
