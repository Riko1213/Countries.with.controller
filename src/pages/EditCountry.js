import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditCountry() {
  const { id } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [countryInput, setCountry] = useState([]);
  const [errorInput, setError] = useState([]);

  useEffect(() => {
    axios.get(`/api/countries/${id}`).then((res) => {
      if (res.data.status === 200) {
        setCountry(res.data.country);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history('/');
      }
    });
  }, [history, id]);

  const handleInput = (e) => {
    e.persist();
    setCountry({ ...countryInput, [e.target.name]: e.target.value });
  };

  const updateCountry = (e) => {
    e.preventDefault();

    const country_id = id;
    const data = {
      name: countryInput.name,
      population: countryInput.population,
      capital: countryInput.capital,
      continent: countryInput.continent,
      code: countryInput.code,
      area: countryInput.area,
      length: countryInput.length,
    };

    axios.put(`/api/countries/${country_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
        history('/');
      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
        setError(res.data.validationErrors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history('/');
      }
    })
    .catch((error) => {
        console.error(error);
    });
  };

    if(loading)
    {
        return <h4>Уншиж байна</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> Буцах</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateCountry} >
                                    <div className="form-group mb-3">
                                        <label>Нэр</label>
                                        <input type="text" name="name" onChange={handleInput} value={countryInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Иргэд</label>
                                        <input type="text" name="population" onChange={handleInput} value={countryInput.population}  className="form-control" />
                                        <span className="text-danger">{errorInput.population}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Нийслэл</label>
                                        <input type="text" name="capital" onChange={handleInput} value={countryInput.capital}  className="form-control" />
                                        <span className="text-danger">{errorInput.capital}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Тив</label>
                                        <input type="text" name="continent" onChange={handleInput} value={countryInput.continent}  className="form-control" />
                                        <span className="text-danger">{errorInput.continent}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Код</label>
                                        <input type="text" name="code" onChange={handleInput} value={countryInput.code}  className="form-control" />
                                        <span className="text-danger">{errorInput.code}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Талбай</label>
                                        <input type="text" name="area" onChange={handleInput} value={countryInput.area}  className="form-control" />
                                        <span className="text-danger">{errorInput.area}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Урт</label>
                                        <input type="text" name="length" onChange={handleInput} value={countryInput.length}  className="form-control" />
                                        <span className="text-danger">{errorInput.length}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Шинэчлэх</button>
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

export default EditCountry;