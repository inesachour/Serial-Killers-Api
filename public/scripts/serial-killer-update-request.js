async function fetchSerialKillers() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const killersList = document.getElementById('killers-list');

    try {
        // Show loading state
        loadingElement.classList.remove('hidden');
        killersList.innerHTML = '';
        errorElement.classList.add('hidden');

        // Fetch data from the API
        const response = await fetch('https://serial-killers-api.netlify.app/api/serialkillers');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Populate the table
        data.forEach(killer => {
            const row = document.createElement('tr');
            row.classList.add('border-b', 'hover:bg-gray-50');
            row.innerHTML = `
            <td class="p-3">${killer.id}</td>
            <td class="p-3">${killer.name}</td>
            <td class="p-3">${killer.alias}</td>
            <td class="p-3">
                <button onclick="openEditModal(${killer.id}, '${killer.name}', '${killer.alias}')" 
                                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                            Edit Request
                        </button>
            </td>
        `;
            killersList.appendChild(row);
        });

        // Hide loading state
        loadingElement.classList.add('hidden');
    } catch (error) {
        console.error('Error fetching serial killers:', error);
        errorElement.textContent = 'Failed to load serial killers data. Please try again later.';
        errorElement.classList.remove('hidden');
        loadingElement.classList.add('hidden');
    }
}

// Function to open edit modal
function openEditModal(id, name, alias) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-alias').value = alias;

    const editModal = document.getElementById('edit-modal');
    editModal.classList.remove('hidden');
    editModal.classList.add('flex');
}

// Close modal function
function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

// Event listeners for modal
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('cancel-edit').addEventListener('click', closeModal);

// Form submission handler (placeholder - you'd implement actual update logic)
document.getElementById('edit-killer-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Update functionality not implemented in this example');
    closeModal();
});

// Fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchSerialKillers);