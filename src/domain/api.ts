import {Batch, Place, Record} from "./data";
import fs from "fs";

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
    const data = await response.json();
    processBatch(data);
    return data;
}

export function calculatePlaceData(record: Record, batch: Batch): Place {
    const place: Place = {
        by_coolness: 0,
        by_ratings_count: 0,
        total: batch.jam_games.length,
    };

    const sortedByCoolness = batch.jam_games.slice().sort((a, b) => b.coolness - a.coolness);
    place.by_coolness = sortedByCoolness.findIndex((r) => r.id === record.id) + 1;

    const sortedByRatingsCount = batch.jam_games.slice().sort((a, b) => a.ratings_count - b.ratings_count);
    place.by_ratings_count = sortedByRatingsCount.findIndex((r) => r.id === record.id) + 1;

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
