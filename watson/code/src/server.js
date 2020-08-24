import app from './app';
import env from './config/variable';

app.listen(env.PORT, () => {
  console.log('Servidor rodando na porta 80');
});
