var	express	    =	require('express'),
    app         =	express();

app.set('port',	(process.env.PORT	||	1111));


// MAIN PAGE
app.use('/',	        express.static('./dist/', {
        'index' : 'index.html'
}));
// INTERNAL PAGE
app.use('/internal',	        express.static('./dist/', {
        'index' : 'internal.html'
}));


app.listen(app.get('port'),	function()	{
    console.log('Server	started:	http://localhost:'	+	app.get('port')	+	'/');
});