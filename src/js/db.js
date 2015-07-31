/*
* database model , and the CRUD methods about it.
* @class db
* */
define(function () {
    /**
    *
    * DataModel of the MNotes
    *
    * NoteBook
    * ------------------------------------------------
    * id* | title | notes [] | createTime | modifyTime
    * ------------------------------------------------
    *
    * notes
    * -----------------------------------------------------
    * id* | pid | title | content | createTime | modifyTime
    * -----------------------------------------------------
    */
    var bookId = 3;
    var noteId = 0;
    var now = (new Date()).toDateString();

    var NoteBook = function (title, notes, id) {
        this.id = id || bookId;
        this.title = title || ('笔记本' + this.id);
        this.createTime = now;
        this.modifyTime = now;
        this.notes = notes || [];
        if(bookId === this.id) {
            bookId++;
        }
    };

    var Note = function (pid, title, content, id, tags) {
        this.id = id || noteId;
        this.pid = pid;
        this.title = title || '笔记';
        this.createTime = now;
        this.modifyTime = now;
        this.content = content || '无内容';
        this.tags = tags || [];
        if(noteId === this.id) {
            noteId++;
        }
    };
    var noteBookList = [{
        id: 0,
        title: "笔记本1",
        createTime: now,
        modifyTime: now,
        notes: [{
            id: 0,
            pid: 0,
            title: '笔记1',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 权威指南'

        },{
            id: 1,
            pid: 0,
            title: '笔记2',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 非权威指南'

        }]
    },{
        id: 1,
        title: "笔记本2",
        createTime: (new Date()).toDateString(),
        modifyTime: (new Date()).toDateString(),
        notes: [{
            id: 0,
            pid: 1,
            title: '笔记3',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 权威指南'

        },{
            id: 1,
            pid: 1,
            title: '笔记4',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 非权威指南'

        }]
    },{
        id: 2,
        title: "笔记本3",
        createTime: (new Date()).toDateString(),
        modifyTime: (new Date()).toDateString(),
        notes: [{
            id: 0,
            pid: 2,
            title: '笔记5',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 权威指南'

        },{
            id: 1,
            pid: 2,
            title: '笔记6',
            createTime: now,
            modifyTime: now,
            content: '#JavaScript 非权威指南'

        }]
    }];
    /*
    * get notebook list
    *
    * @return {array}
    * */
    var getNoteBookList = function () {
        return noteBookList;
    };
    /*
    * add a new note book.
    * @params
    *   title {string}
    *
    * @return {boolean} if added successful or not
    * */
    var addNoteBook = function () {
        var title = 'NoUse';
        if(!isExistBookTitle(title) && title !== '') {
            var now = new Date();
            var notebook = {
                id: bookId,
                title: '笔记本' + bookId,
                createTime: now,
                modifyTime: now,
                notes: []
            };
            noteBookList.push(notebook);
            bookId++;
            return true;
        }
        return false;
    };

    /*
     * delete notebook by array index
     * @params
     *   index {int}
     *
     * @return {object} the deleted notebook itself
     * */
    var deleteNoteBookByIndex = function (index) {
        return noteBookList.splice(index, 1)[0];
    };

    /*
     * delete notebook by title
     * @params
     *   title {string}
     *
     * @return {object} the deleted notebook itself
     * */
    var deleteNoteBookByTitle = function (title) {
        var targetNoteBook = getNoteBookByTitle(title);
        if (targetNoteBook === null) {
            return {};
        }
        return deleteNoteBookByIndex( getNoteBookIndex(targetNoteBook.id) );
    };
    /*
     * delete notebook by id
     * @params
     *   id {int}
     *
     * @return {object} the deleted notebook itself
     * */
    var deleteNoteBookById = function (id) {
        var targetNoteBook = getNoteBookById(id);
        if (targetNoteBook === null) {
            return {};
        }
        return deleteNoteBookByIndex( getNoteBookIndex(targetNoteBook.id) );
    };

    /*
     * get notebook by title
     * @params
     *   title {string}
     *
     * @return {object}
     * */
    var getNoteBookByTitle = function (title) {
        var length = noteBookList.length;
        for (var i = 0; i < length; ++i) {
            if (noteBookList[i].title == title) {
                return noteBookList[i];
            }
        }
        return null;
    };

    /*
     * get notebook by id
     * @params
     *   id {int}
     *
     * @return {object}
     * */
    var getNoteBookById = function (id) {
        var length = noteBookList.length;
        for (var i = 0; i < length; ++i) {
            if (noteBookList[i].id == id) {
                return noteBookList[i];
            }
        }
        return null;
    };
    /*
     * get notebook index by id
     * @params
     *   id {int}
     *
     * @return {int}
     * */
    var getNoteBookIndex = function (id) {
        var length = noteBookList.length;
        for (var i = 0; i < length; ++i) {
            if (noteBookList[i].id == id) {
                return i;
            }
        }
        return -1;
    };

    /*
     * update notebook name by id
     * @params
     *   id {int}
     *   newTitle {string}
     *
     * @return {boolean} if update successful or not
     * */
    var updateNoteBookTitleById = function (id, newTitle) {
        var targetNoteBook = getNoteBookById(id);
        if (targetNoteBook !== null && newTitle !== '') {
            targetNoteBook.title = newTitle;
            targetNoteBook.modifyTime = (new Date()).toDateString();
            return true;
        }
        return false;
    };
    /*
    * check if the book is existed by title
    * @params
    *   title {string}
    *
    * @return {boolean}
    * */
    var isExistBookTitle = function (title) {
           var length = noteBookList.length;
        for (var i = 0; i < length; ++i) {
            if (noteBookList[i].title == title) {
                return true;
            }
        }
        return false;
    };

    /*
     * gte the notes under notebook pid
     * @params
     *   pid {int}
     *
     * @return {array}
     * */
    var getNotesAll = function (pid) {
        if (pid === -1) {
            return [];
        } else {
            console.log('pid', pid);
            var targetNoteBook = getNoteBookById(pid);
            return targetNoteBook.notes;
        }
    };

    /*
     * get a note from notebook pid
     * @params
     *   pid {int}
     *   id {int}
     *
     * @return {object}
     * */
    var getNoteById = function (pid, id) {
        var targetNoteBook = getNoteBookById(pid);
        var notes = targetNoteBook.notes;
        for (var i = 0; i < notes.length; ++i) {
            if (notes[i].id === id) {
                return notes[i];
            }
        }
        return null;
    };

    /*
     * add a note from notebook pid
     * @params
     *   pid {int}
     *   title {string}
     *   content {string}
     *
     * @return {boolean} if added right or not
     * */
    var addNote = function (pid, title, content) {
        var targetNoteBook = getNoteBookById(pid);
        if (title !== '') {
            var now = (new Date()).toDateString();
            var note = {
                id: noteId,
                pid: pid,
                title: title || '笔记' + noteId,
                content: content || '笔记内容',
                createTime: now,
                modifyTime: now,
                tags: []
            };
            noteId++;
            targetNoteBook.notes.push(note);
            return true;
        }
        return false;
    };
    return {
        addNoteBook: addNoteBook,
        deleteNoteBookById: deleteNoteBookById,
        deleteNoteBookByTitle: deleteNoteBookByTitle,
        getNoteBookById: getNoteBookById,
        getNoteBookByTitle: getNoteBookByTitle,
        getNoteBookList: getNoteBookList,

        updateNoteBookTitleById: updateNoteBookTitleById,

        getNotesAll: getNotesAll,
        getNoteById: getNoteById,
        addNote: addNote
    };
});