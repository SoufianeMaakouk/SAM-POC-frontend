import { createContext, useContext, useState } from "react";

const AllocationContext = createContext();

export function AllocationProvider({ children }) {
  const [allocations, setAllocations] = useState([]);

  const addAllocation = (newAllocation) => {
    setAllocations((prev) => [...prev, newAllocation]);
  };

  const updateAllocation = (index, updatedAllocation) => {
    const updated = [...allocations];
    updated[index] = updatedAllocation;
    setAllocations(updated);
  };

  const deleteAllocation = (index) => {
    const updated = allocations.filter((_, i) => i !== index);
    setAllocations(updated);
  };

  return (
    <AllocationContext.Provider
      value={{
        allocations,
        addAllocation,
        updateAllocation,
        deleteAllocation,
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
}

export function useAllocations() {
  return useContext(AllocationContext);
}
