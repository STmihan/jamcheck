import {Request, Response} from 'express';
import {info, update} from "../domain/services";

export async function homeController(req: Request, res: Response) {
    const record = await info(2906514);
    return res.render('index', {record});
}

export async function updateController(req: Request, res: Response) {
    try {
        console.log('Updating data...');
        // await update();
        // delay
        await new Promise(resolve => setTimeout(resolve, 5000));
        return res.send('Data updated');
    } catch (error) {
        return res.render('error', {error: (error as Error).message});
    }
}

export async function infoController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const record = await info(id);
        return res.render('index', {record});
    } catch (error) {
        return res.render('error', {error: (error as Error).message});
    }
}