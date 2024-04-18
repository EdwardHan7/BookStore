import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../store/slices/bookSlice';
import { Book } from '../types';  

interface BookFormProps {
    book: Book | null;         
    onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (book) {
            setFormData({
                name: book.name,
                price: book.price.toString(), 
                category: book.category,
                description: book.description || ''
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: '',
                description: ''
            });
        }
    }, [book]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const bookData = {
            ...formData,
            price: parseFloat(formData.price)  
        };
        if (book) {
            dispatch(updateBook({ ...bookData, id: book.id }));
        } else {
            dispatch(addBook({ ...bookData, id: Date.now().toString() }));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
            />
            <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default BookForm;
