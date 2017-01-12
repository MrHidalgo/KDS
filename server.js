var	express	    =	require('express'),
    app         =	express();

app.set('port',	(process.env.PORT	||	1111));


// MAIN PAGE
app.use('/',	        express.static('./dist/', {
        'index' : 'index.html'
}));
// MAIN PAGE SMALL LANGUAGE RU
app.use('/ru',	        express.static('./dist/', {
        'index' : 'index_ru.html'
}));
// MAIN PAGE SMALL LANGUAGE EN
app.use('/en',	        express.static('./dist/', {
        'index' : 'index_en.html'
}));
// INTERNAL PAGE
app.use('/internal',	        express.static('./dist/', {
        'index' : 'internal.html'
}));
// CONFIRM PAGE
app.use('/confirm',	        express.static('./dist/', {
        'index' : 'confirm.html'
}));


app.listen(app.get('port'),	function()	{
    console.log('Server	started:	http://localhost:'	+	app.get('port')	+	'/');
});