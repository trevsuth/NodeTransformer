import express from 'express';
import { create } from 'express-handlebars';
import TransformerPipeline from './public/services/transformerPipeline.js';

const handlebars = create({defaultLayout: 'main'});

//app and settings
const app = express();  //make app
app.disable('x-powered-by');  //disable powered by
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');  // set display engine to handlebars
app.set('port', process.env.PORT || 3000);  //set port
app.use(express.static('public'));  //make link to public folder

//routes
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/translation', function(req, res){
  res.render('translation');
});

app.get('/classification', function(req, res){
  res.render('classification');
});

app.get('/summarization', function(req, res){
  res.render('summarization');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

//API routes
app.get('/api/translation', async (req, res) => {  
    let response;
    if (req.query.text) {
        const classifier = await TransformerPipeline.getTranslation();
        const result = await classifier(req.query.text);
        console.log(result);
        response = {
            output: result[0].translation_text
        };
        res.status(200).json(response);
    } else {
      res.render('translation');
    }
});

app.get('/api/classification', async (req, res) => {  
    let response;
    if (req.query.text) {
        const classifier = await TransformerPipeline.getClassification();
        const result = await classifier(req.query.text);
        console.log(result);
        response = {
            output: result[0].label + '\n' + result[0].score
        };
        res.status(200).json(response);
    } else {
      res.render('classification');
    }
});

app.get('/api/summarization', async (req, res) => {  
    let response;
    if (req.query.text) {
        const classifier = await TransformerPipeline.getSummary();
        const result = await classifier(req.query.text);
        console.log(result);
        response = {
            output: result[0].summary_text
        };
        res.status(200).json(response);
    } else {
      res.render('summarization');
    }
});

//errors
app.use(function(req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404');
});
 
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

//listen
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});