const { exec } = require("child_process");

function runScript(commands) {
    return new Promise((resolve, reject) => {
        const dbProcess = exec("../db", { encoding: "utf8" });

        let output = "";

        dbProcess.stdout.on("data", (data) => {
            output += data;
        });

        dbProcess.stderr.on("data", (data) => {
            reject(new Error(`Error: ${data}`));
        });

        dbProcess.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Process exited with code: ${code}`));
            } else {
                resolve(output.trim().split("\n"));
            }
        });

        commands.forEach((command) => {
            dbProcess.stdin.write(command + "\n");
        });

        dbProcess.stdin.end();
    });
}

describe("database", () => {
      test("inserts and retrieves a row", async () => {
        const result = await runScript([
          "insert 1 user1 person1@example.com",
          "select",
          ".exit",
        ]);
        expect(result).toEqual([
          "db > Executed.",
          "db > (1, user1, person1@example.com)",
          "Executed.",
          "db > Meta command: .exit",
        ]);
      });

      test("prints error message when table is full", async () => {
        const script = Array.from({ length: 1401 }, (_, i) => 
          `insert ${i + 1} user${i + 1} person${i + 1}@example.com`
        );
        script.push(".exit");

        const result = await runScript(script);

        expect(result[result.length - 2]).toBe("db > Error: Table full.");
      });

      test("allows inserting strings that are the maximum length", async () => {
        const longUsername = "a".repeat(32);
        const longEmail = "a".repeat(255);
        const script = [
          `insert 1 ${longUsername} ${longEmail}`,
          "select",
          ".exit",
        ];

        const result = await runScript(script);
        expect(result).toEqual([
          "db > Executed.",
          `db > (1, ${longUsername}, ${longEmail})`,
          "Executed.",
          "db > Meta command: .exit"
        ]);
      });

    test("prints error message if strings are too long", async () => {
        const longUsername = "a".repeat(40);
        const longEmail = "a".repeat(280);
        const script = [
            `insert 1 ${longUsername} ${longEmail}`,
            "select",
            ".exit",
        ];

        const result = await runScript(script);
        expect(result).toEqual([
            "db > String is too long.",
            "db > Executed.",
            "db > Meta command: .exit"
        ]);
    });

    test("prints an error message if id is negative", async () => {
        const script = [
            "insert -1 cstack foo@bar.com",
            "select",
            ".exit",
        ];

        const result = await runScript(script);
        expect(result).toEqual([
            "db > ID must be positive.",
            "db > Executed.",
            "db > Meta command: .exit"
        ]);
    });
});
