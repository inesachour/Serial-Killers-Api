let serialKillers = [
    {
        id: 1,
        name: "Ted Bundy",
        active_years: "1974-1978",
        victims: 30,
        country: "United States",
        captured: true
    },
    {
        id: 2,
        name: "Jeffrey Dahmer",
        active_years: "1978-1991",
        victims: 17,
        country: "United States",
        captured: true
    },
    {
        id: 3,
        name: "John Wayne Gacy",
        active_years: "1972-1978",
        victims: 33,
        country: "United States",
        captured: true
    },
    {
        id: 4,
        name: "Dennis Rader (BTK Killer)",
        active_years: "1974-1991",
        victims: 10,
        country: "United States",
        captured: true
    },
    {
        id: 5,
        name: "Richard Ramirez",
        active_years: "1984-1985",
        victims: 13,
        country: "United States",
        captured: true
    }
];

// Function to populate the table
function populateTable() {
    const tableBody = document.getElementById('killers-list');
    tableBody.innerHTML = ''; // Clear existing rows

    serialKillers.forEach(killer => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        row.innerHTML = `
            <td class="p-3">${killer.id}</td>
            <td class="p-3 font-medium">${killer.name}</td>
            <td class="p-3">${killer.active_years}</td>
            <td class="p-3">${killer.victims}</td>
            <td class="p-3">${killer.country}</td>
            <td class="p-3">
                <span class="px-2 py-1 rounded ${killer.captured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${killer.captured ? 'Captured' : 'Not Captured'}
                </span>
            </td>
            <td class="p-3">
                <button onclick="openEditModal(${killer.id})" class="text-blue-500 hover:text-blue-700">
                    Edit
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to open edit modal
function openEditModal(id) {
    const killer = serialKillers.find(k => k.id === id);
    if (!killer) return;

    // Populate form fields
    document.getElementById('edit-id').value = killer.id;
    document.getElementById('edit-name').value = killer.name;
    document.getElementById('edit-active-years').value = killer.active_years;
    document.getElementById('edit-victims').value = killer.victims;
    document.getElementById('edit-country').value = killer.country;

    // Set radio button for captured status
    document.getElementById(killer.captured ? 'edit-captured-yes' : 'edit-captured-no').checked = true;

    // Show modal
    document.getElementById('edit-modal').classList.remove('hidden');
}

// Function to close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

// Handle form submission
document.getElementById('edit-killer-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const id = parseInt(document.getElementById('edit-id').value);
    const name = document.getElementById('edit-name').value;
    const activeYears = document.getElementById('edit-active-years').value;
    const victims = parseInt(document.getElementById('edit-victims').value);
    const country = document.getElementById('edit-country').value;
    const captured = document.querySelector('input[name="captured"]:checked').value === 'true';

    // Find and update the killer in the array
    const index = serialKillers.findIndex(k => k.id === id);
    if (index !== -1) {
        serialKillers[index] = {
            id,
            name,
            active_years: activeYears,
            victims,
            country,
            captured
        };

        // Repopulate table
        populateTable();

        // Close modal
        closeEditModal();
    }
});

// Event listeners for modal
document.getElementById('close-modal').addEventListener('click', closeEditModal);
document.getElementById('cancel-edit').addEventListener('click', closeEditModal);

// Theme toggle (same as in other pages)
/*const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeIcon.classList.toggle('ri-moon-line');
    themeIcon.classList.toggle('ri-sun-line');
});*/

// Populate table on page load
document.addEventListener('DOMContentLoaded', populateTable);