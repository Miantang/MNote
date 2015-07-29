/*
* database model , and the methods about it.
* @class db
* */
define(function () {
    var bookId = 4;
    var noteBookList = [{
        id: 0,
        title: "笔记本1",
        createDate: '2015/7/21',
        modifyDate: '2015/7/21',
        notes: []
    },{
        id: 1,
        title: "笔记本2",
        createDate: '2015/7/21',
        modifyDate: '2015/7/21',
        notes: []
    },{
        id: 2,
        title: "笔记本3",
        createDate: '2015/7/21',
        modifyDate: '2015/7/21',
        notes: []
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

    var deleteNoteBookById = function (id) {

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


    return {
        addNoteBook: addNoteBook,
        deleteNoteBookById: deleteNoteBookById,
        deleteNoteBookByTitle: deleteNoteBookByTitle,
        getNoteBookById: getNoteBookById,
        getNoteBookByTitle: getNoteBookByTitle,
        getNoteBookList: getNoteBookList
    };
});