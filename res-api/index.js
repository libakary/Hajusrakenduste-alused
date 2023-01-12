const express = require('express'); // on vaja neid pakette kasutada
const cors = require('cors');
const app = express(); // genereerime uue express paketi et... 

app.use(cors());        // Avoid CORS errors in browsers, veebiturvalisuse vahend 
app.use(express.json()) // Populate req.body

require("./routes/appRoutes")(app) // vaja teiste failide sisu refrencit

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})
