import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCountry() {
  const { id } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [countryInput, setCountry] = useState([]);

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

    if(loading)
    {
        return <h4>Уншиж байна</h4>
    }
    const imgsrc=`https://flagcdn.com/w1280/${countryInput.code}.png`;
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>View
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> Буцах</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group mb-3">
                                    <label>Туг</label>
                                    <img className="form-control" src={imgsrc} alt="new"/>
                                </div>
                                    <div className="form-group mb-3">
                                        <label>Нэр</label>
                                        <input type="text" name="name" onChange={handleInput} value={countryInput.name} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Иргэд</label>
                                        <input type="text" name="population" onChange={handleInput} value={countryInput.population}  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Нийслэл</label>
                                        <input type="text" name="capital" onChange={handleInput} value={countryInput.capital}  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Тив</label>
                                        <input type="text" name="continent" onChange={handleInput} value={countryInput.continent}  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Код</label>
                                        <input type="text" name="code" onChange={handleInput} value={countryInput.code}  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Талбай</label>
                                        <input type="text" name="area" onChange={handleInput} value={countryInput.area}  className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Урт</label>
                                        <input type="text" name="length" onChange={handleInput} value={countryInput.length}  className="form-control" />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewCountry;