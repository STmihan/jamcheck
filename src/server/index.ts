import express from 'express';
import {homeController, infoController, updateController} from "./controllers";
import path from "node:path";
import {update} from "../domain/services";

const app = express();
const port = process.env.PORT || 6060;

app.set('view engine', 'ejs');
app.set('views', path.join('public'));
app.use(express.static(path.join('public')));

app.get('/', homeController);
app.get('/update', updateController); 
app.get('/:id', infoController);


app.listen(port, async () => {
    console.log(`Server is running on port:${port}`);
    update().catch(console.error);
    console.log('Data updated');
});