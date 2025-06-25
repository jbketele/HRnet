import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/app.css';
import useEmployeeStore from '../store/useEmployeeStore';
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';
import Modal from 'hrnet-modal';
import stateOptions from '../data/states'; // Importer les états

function CreateEmployee() {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const departmentOptions = [
    { value: 'HR', label: 'HR' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: stateOptions[0],  
    zipCode: '',
    department: departmentOptions[0],
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDepartmentChange = (option) => {
    setFormData((prev) => ({ ...prev, department: option }));
  };

  const handleStateChange = (option) => {
    setFormData((prev) => ({ ...prev, state: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEmployee({
      ...formData,
      state: formData.state.value,
      department: formData.department.value,
    });

    setShowConfirmation(true);

    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: stateOptions[0],
      zipCode: '',
      department: departmentOptions[0],
    });

  };

  return (
    <>
      <div className='title'>
        <h1>HRnet</h1>
      </div>
      <div className='container'>
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form id="create-employee" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
          />
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            value={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input type="text" id="street" value={formData.street} onChange={handleChange} />

            <label htmlFor="city">City</label>
            <input type="text" id="city" value={formData.city} onChange={handleChange} />

            <label htmlFor="state">State</label>
            <Dropdown
              id="state"
              name="state"
              value={formData.state}
              options={stateOptions}
              onChange={handleStateChange}
            />

            <label htmlFor="zipCode">Zip Code</label>
            <input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Dropdown
            id="department"
            name="department"
            value={formData.department}
            options={departmentOptions}
            onChange={handleDepartmentChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
      {showConfirmation && (
        <>
          <div className="modal-overlay show"></div>
          <Modal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
          />
        </>
      )}
    </>
  );
}

export default CreateEmployee;