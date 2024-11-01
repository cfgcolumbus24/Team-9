import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    text1: '',
    text2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text 1:
            <input
              type="text"
              name="text1"
              value={formData.text1}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Text 2:
            <input
              type="text"
              name="text2"
              value={formData.text2}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;