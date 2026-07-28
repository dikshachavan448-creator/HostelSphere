export const getComplaints = () => {
  const complaints = localStorage.getItem("complaints");
  return complaints ? JSON.parse(complaints) : [];
};

export const saveComplaint = (complaint) => {
  const complaints = getComplaints();

  complaints.push({
    id: Date.now(),
    ...complaint,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem(
    "complaints",
    JSON.stringify(complaints)
  );
};

export const deleteComplaint = (id) => {
  const complaints = getComplaints();

  const updated = complaints.filter(
    (complaint) => complaint.id !== id
  );

  localStorage.setItem(
    "complaints",
    JSON.stringify(updated)
  );
};