const tiny = require("tiny-json-http");
const test = require("tape");

const baseUrl = process.env.STAGING_URL;

test("Sanity Test Staging", async (t) => {
    t.plan(1);
    console.log(baseUrl);
    t.ok(true, "Sanity Test Staging");
});
