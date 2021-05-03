const tiny = require("tiny-json-http");
const test = require("tape");
const sandbox = require("@architect/sandbox");

const baseUrl = "http://localhost:3333";

// this starts a sandbox environment for the tests to excecute in.
test("start", async (t) => {
    t.plan(1);
    await sandbox.start();
    t.ok(true, "started");
});

test("Sanity Test", async (t) => {
    t.plan(1);
    t.ok(true, "Sanity Test");
});

// this ends sandbox
test("end", async (t) => {
    t.plan(1);
    await sandbox.end();
    t.ok(true, "ended");
});
