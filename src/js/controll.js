define(['jquery', 'db'], function ($, db) {
    var disNoteBook = function () {
        var noteBookList = db.getNoteBookList();
        var length = noteBookList.length;
        if (length !== 0) {
            for (var i = 0; i < length; ++i) {
                $('#book-list').append('<li><a class="book-item-name ">' +
                noteBookList[i].title + '</a><input type="button" value="-" title="删除笔记本"/></li>');
            }
            return true;
        }
    };

    var addNoteBook = function () {
        $('#add-book-btn').click(function () {
            $('#book-list').html('');
            db.addNoteBook();
            disNoteBook();
        });
    };

    return {
        addNoteBook: addNoteBook,
        disNoteBook: disNoteBook
    };
});