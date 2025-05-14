import React from "react";
import { Link } from "react-router-dom";
import useEmployeeStore from "../store/useEmployeeStore";
import DataTable from "../components/DataTable";

function EmployeeList() {
    const employees = useEmployeeStore((state) => state.employees);

    // Configuration des colonnes pour DataTable
    const columns = [
        { header: "First Name", accessor: "firstName" },
        { header: "Last Name", accessor: "lastName" },
        { header: "Date of Birth", accessor: "dateOfBirth" },
        { header: "Start Date", accessor: "startDate" },
        { header: "Street", accessor: "street" },
        { header: "City", accessor: "city" },
        { header: "State", accessor: "state" },
        { header: "Zip Code", accessor: "zipCode" },
        { header: "Department", accessor: "department" },
    ];

    return (
        <div className="container" id="employee-div">
            <h1>Current Employees</h1>
            <DataTable columns={columns} data={employees} />
            <Link to="/">Home</Link>
        </div>
    );
}

export default EmployeeList;