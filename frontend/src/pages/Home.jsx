import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => { // dom ready, when change state it is effect
    setLoading(true);
    axios
    .get("http://localhost:5555/books")
    .then((res) => {
        setBooks(res.data.data);
        console.log(res.data.data);
        setLoading(false);
    })
    .catch((err) => {
        console.log(err);
        setLoading(false);
    })
  }, []); // [] -> first time loading
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={() => setShowType('table')}>
                Table
            </button>
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={() => setShowType('card')}>
                Card
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Book List</h1>
            <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>
        {
            loading ? (<Spinner />) : showType === 'table' ? (<BooksTable books={books}/>) : (<BooksCard books={books} />)
        }
    </div>
  )
}

export default Home