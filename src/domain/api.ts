import {Batch, Place, Record} from "./data";
import fs from "fs";
import fetch from "node-fetch";

export function readData(id: string): Promise<Batch> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${id}.json`)) {
            fs.readFile(`${id}.json`, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const batch = JSON.parse(data);
                resolve(batch);
            });
        } else {
            reject("File does not exist");
        }
    });
}

export async function fetchData(id: string, url: string): Promise<Batch> {
    const response = await fetch(url.replace("{}", id));
    const data: Batch = await response.json() as Batch;
    processBatch(data);
    return data;
}

export function calculatePlaceData(record: Record, batch: Batch): Place {
    const place: Place = {
        by_coolness: 0,
        by_ratings_count: 0,
        total: batch.jam_games.length,
    };

    batch.jam_games = batch.jam_games.sort(function (a, b) {
        return b.coolness - a.coolness;
    });
    place.by_coolness = batch.jam_games.findIndex((r) => r.id === record.id) + 1;

    batch.jam_games = batch.jam_games.sort(function (a, b) {
        return b.rating_count - a.rating_count;
    });
    place.by_ratings_count = batch.jam_games.findIndex((r) => r.id === record.id) + 1;

    return place;
}

function processBatch(batch: Batch): Batch {
    batch.jam_games.forEach((record) => {
        record.place = calculatePlaceData(record, batch);
        if (!record.contributors) {
            record.contributors = [];
            record.contributors.push(record.game.user);
        }
    });
    return batch;
}
