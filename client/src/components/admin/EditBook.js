import React, { useState, Fragment } from "react";
import axios from "axios";
import store from "../../store/store";

import { loadBook, handleDeleteBook, handleEditBook } from "../../actions/book";

const EditBook = () => {
  const [bookId, setBookId] = useState(null);
  const onIdChange = (id) => setBookId(id);

  const [currentBook, setCurrentBook] = useState(null);
  const searchBook = async (id) => {
    const res = await axios.get("/api/books/" + id);
    setCurrentBook(res.data);
  };

  const handleUpdateBook = (e) => {
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const [selectedBookCover, setSelectedBookCover] = useState(null);
  const [selectedFilename, setSelectedFilename] = useState(null);
  const onCoverUpdate = (e) => {
    setSelectedBookCover(e.target.files[0]);
    setCurrentBook({ ...currentBook, imageUrl: e.target.files[0].name });
  };

  const onBookCoverUpload = async () => {
    const formData = new FormData();
    // console.log(selectedBookCover);
    formData.append("file", selectedBookCover, selectedBookCover.name);

    await axios.post("api/fileupload", formData);
  };

  const onBookFilenameChange = (e) => {
    setSelectedFilename(e.target.files[0]);
    setCurrentBook({ ...currentBook, fileName: e.target.files[0].name });
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    console.log(selectedFilename);
    formData.append("file", selectedFilename, selectedFilename.name);

    await axios.post("api/fileupload", formData);
  };

  console.log(currentBook);
  return (
    <div className="category">
      <div className="category-form">
        <form className="form">
          <input
            className="form-field"
            placeholder="book id"
            onChange={(e) => onIdChange(e.target.value)}
          />
          <button
            type="button"
            className="btn"
            onClick={() => searchBook(bookId)}
          >
            SEARCH
          </button>
        </form>
      </div>

      {currentBook == null ? (
        <Fragment />
      ) : (
        <div className="subcategory-form">
          <div className="inp">
            <span className="label">Titlu</span>
            <input
              className="form-field-book"
              placeholder="title"
              name="title"
              defaultValue={currentBook.title}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>

          <div className="inp">
            <span className="label">Autor</span>
            <input
              className="form-field-book"
              placeholder="author"
              name="author"
              defaultValue={currentBook.author}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>
          {/* <div className="inp">
            <span className="label">Categorie</span>

            <div className="dropdown-container">
              <MultiSelect
                name="category"
                className="dropdown"
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
                hasSelectAll={false}
              />
            </div>
          </div>

          <div className="inp">
            <span className="label">Subcategory</span>

            <div className="dropdown-container">
              <MultiSelect
                name="category"
                className="dropdown"
                options={subcategoryOptions}
                value={categorySelected}
                onChange={setCategorySelected}
                labelledBy={"Select"}
                hasSelectAll={false}
              />
            </div>
          </div> */}

          <div className="inp">
            <span className="label">Descriere</span>
            <input
              className="form-field-book"
              placeholder="description"
              name="description"
              defaultValue={currentBook.description}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>

          <div className="inp">
            <label htmlFor="file" className="btn select">
              Select Cover
            </label>
            <input
              id="file"
              onChange={(e) => onCoverUpdate(e)}
              className=" hide"
              type="file"
            />
            <input
              className="form-field-book upload"
              name="imageUrl"
              placeholder={
                selectedBookCover == null ? currentBook.imageUrl : selectedBookCover.name
              }
              defaultValue={
                selectedBookCover == null ? currentBook.imageUrl : selectedBookCover.name
              }
              onChange={(e) => handleUpdateBook(e)}
            />
            <span className="btn" onClick={onBookCoverUpload}>
              Upload
            </span>
          </div>

          <div className="inp">
            <span className="label">Limba</span>
            <input
              className="form-field-book"
              placeholder="language"
              name="language"
              defaultValue={currentBook.language}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>
          <div className="inp">
            <span className="label">Pagini</span>
            <input
              className="form-field-book"
              placeholder="pages"
              name="pages"
              defaultValue={currentBook.pages}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>
          <div className="inp">
            <span className="label">Format</span>
            <input
              className="form-field-book"
              placeholder="format"
              name="format"
              defaultValue={currentBook.format}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>

          <div className="inp">
            <label htmlFor="fileEbook" className="btn select">
              Select file
            </label>
            <input
              id="fileEbook"
              onChange={(e) => onBookFilenameChange(e)}
              className=" hide"
              type="file"
            />
            <input
              className="form-field-book upload"
              name="fileName"
              placeholder={
                selectedFilename == null ? currentBook.fileName : selectedFilename.name
              }
              defaultValue={
                selectedFilename == null ? currentBook.fileName : selectedFilename.name
              }
              onChange={(e) => handleUpdateBook(e)}
            />
            <span className="btn" onClick={onFileUpload}>
              Upload
            </span>
          </div>

          <div className="inp">
            <span className="label">ISBN</span>
            <input
              className="form-field-book"
              placeholder="isbn"
              name="isbn"
              defaultValue={currentBook.isbn}
              onChange={(e) => handleUpdateBook(e)}
            />
          </div>

          <button
            className="btn"
            onClick={() => {
              store.dispatch(handleEditBook(bookId, currentBook));
              setCurrentBook(null);
              setSelectedBookCover(null);
              setSelectedFilename(null);
            }}
          >
            Update Book
          </button>
          <button
            className="btn"
            onClick={() => {
              store.dispatch(handleDeleteBook(bookId));
              setCurrentBook(null);
              setSelectedBookCover(null);
              setSelectedFilename(null);
            }}
          >
            Delete Book
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
