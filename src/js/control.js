define(['jquery', 'db', 'marked'], function ($, db, marked) {
    var currentNoteBookId = -1;
    var currentNoteId = -1;

    var init = function () {
        initNoteBook();
        initNote();
        disNoteBook();
        displayNoteByBook();
    };

    var initNoteBook = function () {
        var $bookList = $('#book-list');
        $bookList.click(function (e) {
            if (!$bookList.children().hasClass('selected')) {
                if ( $(e.target).hasClass('active') ) {
                    $bookList.children().removeClass('active selected');
                    $(e.target).addClass('selected');
                    $(e.target).focus();
                    $(e.target).blur(function () {
                        $('#bottom-area').hide();
                        $(this).removeClass('selected');
                    });
                    $('#bottom-area').show();
                } else {
                    $bookList.children().removeClass('active selected');
                    $('#bottom-area').hide();
                    $(e.target).addClass('active');

                    currentNoteBookId = e.target.getAttribute('value');
                    displayNoteByBook();
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
        $('#add-book-btn').click(addNoteBook);
    };

    var initNote = function () {
        $('#add-note').click(addNote);
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
            currentNoteBookId = noteBookList[length-1].id;
            displayNoteByBook();
            return true;
        }
        return false;
    };

    var addNoteBook = function () {
            db.addNoteBook();
            disNoteBook();
            $('.book-item').last().addClass('selected');
            renameNoteBook();
    };

    var selectElementContents = function(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };

    var renameNoteBook = function (e) {
        var renameSelected = $('#book-list li.selected')[0];
        $(renameSelected).attr('contenteditable', true);
        $(renameSelected).addClass('editable');
        $(renameSelected).focus();
        selectElementContents(renameSelected);
        $(renameSelected).blur(function (e) {
            $(renameSelected).attr('contenteditable', false);
            $(renameSelected).removeClass('editable');
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

    var displayNoteByBook = function () {
        $('#note-list').html('');
        var notes = db.getNotesAll(currentNoteBookId);
        if (notes.length === 0) {
            return false;
        } else {
            for (var i = 0; i < notes.length; ++i) {
                $('#note-list').append('<li><h1>' + notes[i].title + '</h1><p>' +
                notes[i].content + '</p><input type="button" value="-" title="删除笔记"/></li>');
            }
            currentNoteId = 0;
            displayNote();
        }
        if( $('#note-list').html() === '') {
            return false;
        } else {
            return true;
        }
    };

    var displayNote = function () {
        var note = db.getNoteById(currentNoteBookId, currentNoteId);
        $('#note-time').text('创建时间:' + note.createTime.toLocaleString() +
            '              ' + '更新时间:' + note.modifyTime.toLocaleString());
        $('#content-title').text(note.title);
        $('#note-details').html(marked(note.content));
    };

    var addNote = function () {
        db.addNote(currentNoteBookId);
        displayNote();
        displayNoteByBook();
    };
    return {
        init: init
    };
});