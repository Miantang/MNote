require.config({
    baseUrl: 'js',
    paths: {
        jquery: './jquery-1.11.3.min',
        db: './db',
        control: './controll'
    }
});
require(['jquery', 'db', 'control'], function ($, db, ctrl) {
    ctrl.disNoteBook();
    ctrl.addNoteBook();
});
