import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { saveBook, searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const Home = () => {
  // create state for holding returned google api data
  // const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  // const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });

  // create method to search for books and set state on form submit
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  // if (!searchInput) {
  //   return false;
  // }

  // try {
  //   if (!response.ok) {
  //     throw new Error("something went wrong!");
  //   }
  // const { items } = await response.json();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // create function to handle saving a book to our database
  // const handleSaveBook = async (bookId) => {
  // find the book in `searchedBooks` state by the matching id
  // const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  // get token
  // const token = Auth.loggedIn() ? Auth.getToken() : null;

  // if (!token) {
  //   return false;
  // }

  // try {
  // const response = await saveBook(bookToSave, token);
  // if (!response.ok) {
  //   throw new Error("something went wrong!");
  // }
  // await saveBook({
  //   variables: bookToSave(),
  // });
  // if book successfully saves to user's account, save book id to state
  //   setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  // } catch (err) {
  //   console.error(err);
  // }
  // };

  // set state for submitting
  const [submit, setSubmit] = useState(false);
  // set state for form
  const [form, setForm] = useState({
    bill: "",
  });
  // set state for button percentages
  const [percentage, setPercentage] = useState({
    value: "",
  });
  // state to hold the total
  const [total, setTotal] = useState();
  // handle input field
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(e.target.value);
  };
  // handle button values
  const handlePercentage = (e) => {
    const { value } = e.target;
    setPercentage({
      ...percentage,
      value,
    });
    console.log(e.target.value);
  };
  // function to make the calculation
  const tipCalculator = () => {
    console.log(form, percentage);
    const tip = parseInt(form.bill * percentage.value);
    setTotal({
      tip,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await tipCalculator();
    await setSubmit(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label> Enter Your Bill Amount</label> <br />
          <input
            name="bill"
            placeholder="how much $"
            onChange={handleInput}
            value={form.bill}
          />
          <br />
          <label>How Much Do You Want To Tip</label>
          <br />
          <button
            type="button"
            id={percentage.ten}
            value={0.1}
            onClick={handlePercentage}
          >
            10%
          </button>
          <button
            type="button"
            id={percentage.fifteen}
            value={0.15}
            onClick={handlePercentage}
          >
            15%
          </button>
          <button
            type="button"
            id={percentage.twenty}
            value={0.2}
            onClick={handlePercentage}
          >
            20%
          </button>
          <br />
          <input type="submit" />
        </form>
      </div>

      {submit ? (
        <div>
          {" "}
          <p> Your tip is: {total.tip}</p>
        </div>
      ) : null}
    </>
  );
};

export default Home;
