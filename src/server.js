const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = require('./routes');

const app = Express();

app.use(cors());
app.use(bodyParser.json());
app.use(Routes);

app.listen(3333, () => console.log('🚀 Server started!'));
