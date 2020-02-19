import React from 'react';

function Form(props) {
  return (
    <div className='container'>
      <form>
        <div className='form-group'>
          <label htmlFor='search'>
            <h2>Search your favorite books using Goole Search</h2>
          </label>
          <input
            onChange={props.handleInputChange}
            value={props.search}
            name='search'
            type='text'
            className='form-control'
            placeholder='Input book name'
            id='search'
          />
          <button
            onClick={props.handleFormSubmit}
            className='btn btn-primary mt-3 mb-5 btn-lg'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
