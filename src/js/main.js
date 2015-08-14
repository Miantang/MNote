require.config({
    baseUrl: 'js',
    paths: {
        jquery: './jquery-1.11.3.min',
        db: './db',
        control: './control',
        marked: './marked.min'
    }
});
require(['db', 'control'], function (db, ctrl) {
    ctrl.init();
    window.db = db;
    
});
