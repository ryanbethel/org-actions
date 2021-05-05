const tiny = require("tiny-json-http");
const fs = require("fs");

//TODO: Hardcoded filename, either change to command line arg or read from stdin
const registered = fs.readFileSync("registered-repos.txt", "utf8");

async function main() {
    const registeredArray = registered.split(/\r\n|\n|\r/);

    let allPublicRepos, publicUnregistered;
    try {
        allPublicRepos = await tiny.get({
            url: "https://api.github.com/users/begin-examples/repos",
            data: { type: "public" },
        });
        publicUnregistered = allPublicRepos.body
            .filter((repo) => !registeredArray.includes(`begin-examples/${repo.name}`))
            .map((repo) => repo.name);
        process.stdout.write(publicUnregistered.join("\n") + "\n");
    } catch (e) {
        console.log(e);
        process.stderr.write(e);
    }
}

main();
