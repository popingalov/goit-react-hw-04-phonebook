import React from 'react';
import PropTypes from 'prop-types';

let Filter = ({ handleChangeFilter, filter }) => {
  return (
    <section>
      <label>
        Find contacts by name
        <input
          onChange={handleChangeFilter}
          value={filter}
          name="filter"
          type="text"
        />
      </label>
    </section>
  );
};

export default Filter;

Filter.propTypes = {
  handleChangeFilter: PropTypes.func,
  filter: PropTypes.string,
};
