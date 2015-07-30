define(['jquery', 'db'], function ($, db) {
    var init = function () {
        var $bookList = $('#book-list');
        $bookList.focus(function (e) {
            $(e.target).attr('contenteditable', true);
        });
        $bookList.blur(function (e) {
            $(e.target).attr('contenteditable', false);
        });
        $bookList.click(function (e) {
            if (!$bookList.children().hasClass('selected')) {
                if ( $(e.target).hasClass('active') ) {
                    $bookList.children().removeClass('active selected');
                    $(e.target).addClass('selected');
                    $('#bottom-area').show();
                } else {
                    $bookList.children().removeClass('active selected');
                    $('#bottom-area').hide();
                    $(e.target).addClass('active');
                }
            } else {
                if ( $(e.target).hasClass('selected') ) {
                    $bookList.children().removeClass('active selected');
                    $('#bottom-area').hide();
                    $(e.target).addClass('active');
                } else {
                    $bookList.children().removeClass('active selected');
                    $('#bottom-area').hide();
                    $(e.target).addClass('active');
                }
            }
        });
        $('#delelte-btn').click(deleteNoteBook);
    };
    var disNoteBook = function () {
        $('#bottom-area').hide();
        var noteBookList = db.getNoteBookList();
        var length = noteBookList.length;
        if (length !== 0) {
            var $bookList = $('#book-list');
            for (var i = 0; i < length; ++i) {
                $bookList.append('<li class="book-item" value="' + noteBookList[i].id + '">' +
                    noteBookList[i].title +  '</li>');
            }
            $('.book-item').last().addClass('active');
            return true;
        }
        return false;
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

    var deleteNoteBook = function () {
        var delSelected = $('#book-list li.selected')[0];
        var id = delSelected.getAttribute('value');
        delSelected.remove();
        $('#book-list').html('');
        db.deleteNoteBookById(id);
        disNoteBook();

    };
    return {
        init: init,
        addNoteBook: addNoteBook,
        disNoteBook: disNoteBook
    };
});