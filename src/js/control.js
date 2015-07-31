define(['jquery', 'db'], function ($, db) {
    var init = function () {
        initNoteBook();
    };

    var initNoteBook = function () {
        var $bookList = $('#book-list');
        $bookList.focus(function (e) {

        });
        $bookList.blur(function (e) {
            console.log($(e.target), "BB");
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
        $('#rename-btn').click(renameNoteBook);
    };

    var disNoteBook = function () {
        $('#bottom-area').hide();
        $('#book-list').html('');
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
            db.addNoteBook();
            disNoteBook();
            renameNoteBook( $('.book-item').last()[0] );
        });
    };

    var renameNoteBook = function (e) {
        var renameSelected = $('#book-list li.selected')[0];
        $(renameSelected).attr('contenteditable', true);
        $(renameSelected).focus();
        $(renameSelected).blur(function (e) {
            console.log($(e.target), "BB");
            $(renameSelected).attr('contenteditable', false);
            var id = renameSelected.getAttribute('value');
            db.updateNoteBookTitleById(id, $(renameSelected).text());
            disNoteBook();
        });

    };

    var deleteNoteBook = function () {
        var delSelected = $('#book-list li.selected')[0];
        var id = delSelected.getAttribute('value');
        delSelected.remove();
        db.deleteNoteBookById(id);
        disNoteBook();
    };

    var addNote = function () {

    };
    return {
        init: init,
        addNoteBook: addNoteBook,
        disNoteBook: disNoteBook
    };
});