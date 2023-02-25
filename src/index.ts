import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';

const app = express();

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send(`
  <div>
    <h1>Hi there!</h1>
  </div>
  `)
});

app.listen(3000, () => {
  console.log('Listenitn on port 3000');
})