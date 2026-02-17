const BACKEND_URL = "https://sam-poc-backend.onrender.com";

const venueSelect = document.getElementById("venueSelect");
const loadBtn = document.getElementById("loadDelivery");
const tableBody = document.querySelector("#deliveryTable tbody");

/* Load venues on page load */
fetch(`${BACKEND_URL}/venues`)
  .then(res => res.json())
  .then(data => {
    venueSelect.innerHTML = `<option value="">Select venue</option>`;
    data.forEach(venue => {
      const option = document.createElement("option");
      option.value = venue._id;
      option.textContent = venue.name;
      venueSelect.appendChild(option);
    });
  })
  .catch(err => {
    venueSelect.innerHTML = `<option>Error loading venues</option>`;
    console.error(err);
  });

/* Load delivery sheet */
loadBtn.addEventListener("click", () => {
  const venueId = venueSelect.value;
  if (!venueId) {
    alert("Please select a venue");
    return;
  }

  tableBody.innerHTML = "";

  fetch(`${BACKEND_URL}/deliveries/venue/${venueId}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        tableBody.innerHTML =
          `<tr><td colspan="3">No allocations for this venue</td></tr>`;
        return;
      }

      data.forEach(row => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${row.item}</td>
          <td>${row.functionalArea}</td>
          <td>${row.quantity}</td>
        `;

        tableBody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load delivery sheet");
    });
});
