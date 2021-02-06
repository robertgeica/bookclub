import React, { useState, useEffect } from "react";
import store from "../../store/store";
import MultiSelect from "react-multi-select-component";
import { loadCategories } from "../../actions/category";
import { handleAddBook } from "../../actions/book";
import axios from 'axios';


const AddBook = ({ options, categories }) => {

  const [isbn, setIsbn] = useState();

  const [selected, setSelected] = useState([]);
  const [labelSelected, setLabelSelected] = useState([]);

  const onChange = (isbn) => {
    setIsbn(isbn);
  };
  const [bookObj, setBookObj] = useState({});
  // show only subcategories of selected categories
  let subcategoryOptions = [];
  selected == null && selected == undefined
    ? (subcategoryOptions = [])
    : selected.map((selectedCategory) => {
        categories.map((category) => {
          if (selectedCategory.value == category.categoryName) {
            category.subcategories.map((subcategory) => {
              let subcategoryObj = { label: subcategory, value: subcategory };
              subcategoryOptions = [...subcategoryOptions, subcategoryObj];
            });
          }
        });
      });

  const searchBook = async () => {
    setBookObj({});
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const book = await response.json();
      // console.log(book)

      const bk = book.items[0].volumeInfo;
      console.log(bk);

      if (bk.description == undefined) {
        console.log("undef");
      }

      const newObj = {
        title: bk.title ? bk.title : "",

        author: bk.authors == undefined ? "" : bk.authors[0],
        rating: 0,
        category: [],
        subcategories: [],
        // category: bk.categories == undefined ? "" : bk.categories,
        // subcategories: bk.subcategories == undefined ? "" : bk.subcategories,
        rating: 0,

        description: bk.description == undefined ? "" : bk.description,

        image: bk.imageLinks == undefined ? "" : bk.imageLinks.thumbnail,
        language: "",
        pages: bk.pageCount ? bk.pageCount : 0,
        isReaded: false,
        format: "-",
        fileName: "",
        isbn: isbn,
      };
      console.log(newObj);
      setBookObj(newObj);

      // console.log(newObj);
    } catch (error) {
      console.log("book not found. complete manually");
    }
  };

  useEffect(() => {
    store.dispatch(loadCategories());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookObj({ ...bookObj, [name]: value });
  };

  let selectedLabels = [];

  labelSelected.map((v) => {
    selectedLabels = [...selectedLabels, v.value];
  });

  let selectedCategory = [];

  selected.map((v) => {
    selectedCategory = [...selectedCategory, v.value];
  });

  const submitBook = () => {
    let arr = [];
    let categsInputArray = selectedCategory;
    categories.map((category) => {
      categsInputArray.map((cc) => {
        if (category.categoryName == cc) {
          arr.push(category);
        }
      });
    });

    let categoryId = [];
    arr.map((category) => categoryId.push({ categoryId: category._id }));
    bookObj.category = categoryId;
    bookObj.subcategories = selectedLabels;
    console.log(bookObj);
    store.dispatch(handleAddBook(bookObj));
    setBookObj({});
  };

  const [selectedBookCover, setSelectedBookCover] = useState(null);

  const onBookChange = (e) => {
    setSelectedBookCover(e.target.files[0]);
  };

  const onBookUpload = async () => {
    const formData = new FormData();
    console.log(selectedBookCover);
    formData.append("file", selectedBookCover, selectedBookCover.name);

    await axios.post("api/fileupload", formData);
  };


  return (
    <div className="category">
      <div className="category-form">
        <form className="form">
          <input
            className="form-field"
            placeholder="isbn"
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="button" className="btn" onClick={searchBook}>
            SEARCH
          </button>
        </form>
      </div>

      <div className="subcategory-form">
        <div className="inp">
          <span className="label">Titlu</span>
          <input
            className="form-field-book"
            placeholder="title"
            name="title"
            defaultValue={bookObj.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">Autor</span>
          <input
            className="form-field-book"
            placeholder="author"
            name="author"
            defaultValue={bookObj.author}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">Rating</span>
          <input
            className="form-field-book"
            placeholder="rating"
            name="rating"
            defaultValue={bookObj.rating}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
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
              value={labelSelected}
              onChange={setLabelSelected}
              labelledBy={"Select"}
              hasSelectAll={false}
            />
          </div>
        </div>

        <div className="inp">
          <span className="label">Descriere</span>
          <input
            className="form-field-book"
            placeholder="description"
            name="description"
            defaultValue={bookObj.description}
            onChange={(e) => handleChange(e)}
          />
        </div>

        
        <div className="inp">
          <label htmlFor="file" className="btn select">
            Select Cover
          </label>
          <input
            id="file"
            onChange={e => onBookChange(e)}
            className=" hide"
            type="file"
          />
          <input
            className="form-field-book upload"
            name="imageUrl"
            placeholder={selectedBookCover == null ? "" : selectedBookCover.name}
            defaultValue={selectedBookCover == null ? "" : selectedBookCover.name}
            onChange={(e) => handleChange(e)}
          />
          <span className="btn" onClick={onBookUpload}>
            Upload
          </span>
        </div>


        <div className="inp">
          <span className="label">Limba</span>
          <input
            className="form-field-book"
            placeholder="language"
            name="language"
            defaultValue={bookObj.language}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">Pagini</span>
          <input
            className="form-field-book"
            placeholder="pages"
            name="pages"
            defaultValue={bookObj.pages}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">Format</span>
          <input
            className="form-field-book"
            placeholder="format"
            name="format"
            defaultValue={bookObj.format}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">Filename</span>
          <input
            className="form-field-book"
            placeholder="file name"
            name="fileName"
            defaultValue={bookObj.fileName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inp">
          <span className="label">ISBN</span>
          <input
            className="form-field-book"
            placeholder="isbn"
            name="isbn"
            defaultValue={bookObj.isbn}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button className="btn" onClick={submitBook}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
