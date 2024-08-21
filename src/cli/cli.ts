import {info, update} from "../domain/services";

async function main() {
    if (process.argv.length > 1) {
        if (process.argv[2] === "update") {
            await update();
        } else if (parseInt(process.argv[2])) {
            const record = await info(parseInt(process.argv[2]));
            console.log(record);
        } else {
            throw new Error("Invalid command");
        }
    }
}

main().catch(console.error);
