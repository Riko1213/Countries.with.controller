import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddCountry() {

    const navigate = useNavigate();
    const [countryInput, setCountry] = useState({
        name: '',
        population: '',
        capital: '',
        continent: '',
        code:'',
        area:'',
        length:'',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCountry({...countryInput, [e.target.name]: e.target.value })
    }

    const saveCountry = async (e) => {
        e.preventDefault();

        const data = {
            name: countryInput.name,
            population: countryInput.population,
            capital: countryInput.capital,
            continent: countryInput.continent,
            code: countryInput.code,
            area: countryInput.area,
            length: countryInput.length,
        };

        try {
            const res = await axios.post(`/api/countries`, data);

            if (res.data.status === 200) {
                swal("Амжилттай!", res.data.message, "success");
                setCountry({
                    name: '',
                    population: '',
                    capital: '',
                    continent: '',
                    code:'',
                    area:'',
                    length:'',
                    error_list: [],
                });
                navigate('/'); // Use navigate instead of navigate.push
            } else if (res.data.status === 422) {
                setCountry({ ...countryInput, error_list: res.data.validate_err });
            }
        } catch (error) {
            console.error('Алдаа:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Нэмэх
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> Буцах</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveCountry} >
                                    <div className="form-group mb-3">
                                        <label>Нэр</label>
                                        <input type="text" name="name" onChange={handleInput} value={countryInput.name} className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Иргэд</label>
                                        <input type="text" name="population" onChange={handleInput} value={countryInput.population}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.population}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Нийслэл</label>
                                        <input type="text" name="capital" onChange={handleInput} value={countryInput.capital}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.capital}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Тив</label>
                                        <input type="text" name="continent" onChange={handleInput} value={countryInput.continent}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.continent}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Код</label>
                                        <input type="text" name="code" onChange={handleInput} value={countryInput.code}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.code}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Талбай</label>
                                        <input type="text" name="area" onChange={handleInput} value={countryInput.area}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.area}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Урт</label>
                                        <input type="text" name="length" onChange={handleInput} value={countryInput.length}  className="form-control" />
                                        <span className="text-danger">{countryInput.error_list.length}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Хадгалах</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddCountry;