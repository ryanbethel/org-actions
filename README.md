# org-actions

## Secrets

-   **smoke-test-rig repository secrets**

    -   WORKFLOW_SYNC_PERSONAL_ACCESS_TOKEN: This is not the standard github token, but it must be a personal access token. It should only be added to this repository to limit misuse.

-   **begin-examples organization Secrets**

    -   BX_SLACK_WEBHOOK
    -   BX_AWS_ACCESS_KEY_ID
    -   BX_AWS_SECRET_ACCESS_KEY

## Registering New Repositories

New repositories are registered by adding them to the `REPOSITORIES` environment variable in the `.github/workflows/workflow-sync.yml` file as shown below:

```yaml
---
REPOSITORIES: |
    begin-examples/node-hello-world
```

All the repositories listed will have a `smoke-tests.yml` file synchronized to their `.github/workflows` directory. **Any changes made to this file locally may be overridden by the synchronization workflow.**

## Test Location

Tests should be created in the following locations for each example repository:

```
|-.github
    |-workflows
        |-smoke-tests
            |-sandbox
                |-this-test.js
                |-another-test.js
            |-staging
                |-this-test.js
                |-another-test.js
```

If the repository is registered with the test rig it must have at least one test in each of the sandbox and staging directory or a failure message will be reported to the connected slack channel. Sample tests are shown in the `workflow-templates/smoke-tests` directory.

## Writing Tests

Dependencies for the following tools are added to the testing environment by the workflow automatically:

-   tiny-json-http
-   tape
-   tape-spec
-   @architect/sandbox

### Sandbox Tests

```javascript
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
```

### Staging Tests

For staging tests the staging url is passed with the `STAGING_URL` environment variable.

```javascript
const tiny = require("tiny-json-http");
const test = require("tape");

const baseUrl = process.env.STAGING_URL;

test("Sanity Test Staging", async (t) => {
    t.plan(1);
    console.log(baseUrl);
    t.ok(true, "Sanity Test Staging");
});
```
