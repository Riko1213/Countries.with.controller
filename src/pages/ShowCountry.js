import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ShowCountry() {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`/api/countries`).then((res) => {
            if (res.status === 200) {
                setCountries(res.data.countries);
                setLoading(false);
            }
        });
    }, []);

    const deleteCountry = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        axios.delete(`/api/countries/${id}`).then((res) => {
            if (res.data.status === 200) {
                swal('Устгасан!', res.data.message, 'success');
                setCountries((prevCountries) =>
                    prevCountries.filter((country) => country.id !== id)
                );
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                thisClicked.innerText = 'Delete';
            }
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <h4>Уншиж байна</h4>;
    }

    const country_HTMLTABLE = currentItems.map((item, index) => {
        const imgsrc = `https://flagcdn.com/w320/${item.code}.png`;
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>
                    <img src={imgsrc} alt="flag" />
                </td>
                <td>{item.name}</td>
                <td>{item.continent}</td>
                <td>
                    <Link to={`edit-country/${item.id}`} className="btn btn-success btn-sm">
                        Edit
                    </Link>
                </td>
                <td>
                    <button
                        type="button"
                        onClick={(e) => deleteCountry(e, item.id)}
                        className="btn btn-danger btn-sm"
                    >Delete</button>
                </td>
                <td>
                    <Link to={`view-country/${item.id}`} className="btn btn-success btn-sm">
                        View
                    </Link>
                </td>
            </tr>
        );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCountries.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Улсууд
                                    <Link to={'/country'} className="btn btn-primary btn-sm float-end">
                                        Add country
                                    </Link>
                                </h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Хайх"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="form-control" 
                                    />
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Туг</th>
                                            <th>Нэр</th>
                                            <th>Тив</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>{country_HTMLTABLE}</tbody>
                                </table>
                                <ul className="pagination">
                                    {pageNumbers.map((number) => (
                                        <li key={number} className="page-item">
                                            <button onClick={() => paginate(number)} className="page-link">
                                                {number}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowCountry;
