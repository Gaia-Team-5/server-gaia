const Express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./routes');

const app = Express();

app.use(bodyParser.json());
app.use(Routes);

app.listen(3333, () => console.log('🚀 Server started!'));
