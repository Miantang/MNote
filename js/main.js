require.config({
    baseUrl: 'js',
    paths: {
        jquery: './jquery-1.11.3.min',
        db: './db',
        control: './control'
    }
});
require(['jquery', 'db', 'control'], function ($, db, ctrl) {
    ctrl.init();
    ctrl.disNoteBook();
    ctrl.addNoteBook();
    window.db = db;
});
