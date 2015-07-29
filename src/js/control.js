define(['jquery', 'db'], function ($, db) {
    var disNoteBook = function () {
        var noteBookList = db.getNoteBookList();
        var length = noteBookList.length;
        if (length !== 0) {
            var $bookList = $('#book-list');
            for (var i = 0; i < length; ++i) {
                $bookList.append('<li class="book-item">' +
                    noteBookList[i].title +  '</li>');
            }
            $bookList.focus(function (e) {
                $(e.target).attr('contenteditable', true);
            });
            $bookList.blur(function (e) {
                $(e.target).attr('contenteditable', false);
            });
            $bookList.click(function (e) {
                if ( $(e.target).hasClass('active') ) {
                    $bookList.children().removeClass('active selected');
                    $(e.target).addClass('selected');
                } else {
                    $bookList.children().removeClass('active selected');
                    $(e.target).addClass('active');
                }

            });
            $('.book-item').last().addClass('active');
            return true;
        }
    };

    var addNoteBook = function () {
        $('#add-book-btn').click(function () {
            $('#book-list').html('');
            db.addNoteBook();
            disNoteBook();
            renameNoteBook( $('.book-item').last()[0] );
        });
    };

    var renameNoteBook = function (element) {
        element.focus();
    };

    return {
        addNoteBook: addNoteBook,
        disNoteBook: disNoteBook
    };
});