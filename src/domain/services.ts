import {fetchData, readData} from "./api";
import {JAM_ID, JAM_URL, Record} from "./data";
import fs from "fs";

export async function update() {
    const data = await fetchData(JAM_ID, JAM_URL);
    fs.writeFileSync(`${JAM_ID}.json`, JSON.stringify(data));
}

export async function info(id: number): Promise<Record> {
    const batch = await readData(JAM_ID);
    const record = batch.jam_games.find((r) => r.game.id === id);
    if (!record) {
        throw new Error("Record not found");
    }
    return record;
}
