import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const parseDate = (date) =>
    typeof date === 'string' ? new Date(date) : date;

const useEmployeeStore = create(
    persist(
        (set) => ({
            employees: [],
            addEmployee: (employee) =>
                set((state) => ({
                    employees: [
                        ...state.employees,
                        {
                            ...employee,
                            dateOfBirth: parseDate(employee.dateOfBirth),
                            startDate: parseDate(employee.startDate),
                        },
                    ],
                })),
        }),
        {
            name: 'employee-storage',
            getStorage: () => localStorage,

            // Convertir les dates au moment de la réhydratation (chargement depuis le localStorage)
            onRehydrateStorage: () => (state) => {
                const parsed = state.employees.map((emp) => ({
                    ...emp,
                    dateOfBirth: parseDate(emp.dateOfBirth),
                    startDate: parseDate(emp.startDate),
                }));
                state.employees = parsed;
            },
        }
    )
);

export default useEmployeeStore;