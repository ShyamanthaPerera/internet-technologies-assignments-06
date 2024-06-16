

const itemDetails = [];
let customers = [];
let items = [];

function showCustomerCrud() {
    document.getElementById('invoiceCrud').style.display = 'none';
    document.getElementById('customerCrud').style.display = 'block';
    document.getElementById('itemCrud').style.display = 'none';
}

function showItemCrud() {
    document.getElementById('invoiceCrud').style.display = 'none';
    document.getElementById('customerCrud').style.display = 'none';
    document.getElementById('itemCrud').style.display = 'block';
}

function showInvoiceCrud() {
    document.getElementById('customerCrud').style.display = 'none';
    document.getElementById('itemCrud').style.display = 'none';
    document.getElementById('invoiceCrud').style.display = 'block';
    refreshCustomerAndItemSelect();
}

function addCustomer() {
    const customerId = document.getElementById('customerId').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPhone = document.getElementById('customerPhone').value;

    const customer = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        phone: customerPhone
    };

    customers.push(customer);
    $('#addCustomerModal').modal('hide');
    document.getElementById('addCustomerForm').reset();
    renderCustomerTable();
}

function renderCustomerTable() {
    const tableBody = document.getElementById('customerTableBody');
    tableBody.innerHTML = '';

    customers.forEach((customer, index) => {
        const row = `<tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteCustomer(${index})">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    renderCustomerTable();
}

function searchCustomer() {
    const searchInput = document.getElementById('searchCustomerInput').value;
    const tableBody = document.getElementById('customerTableBody');
    tableBody.innerHTML = '';

    const filteredCustomers = customers.filter(customer => customer.id.includes(searchInput));
    filteredCustomers.forEach((customer, index) => {
        const row = `<tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteCustomer(${index})">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

function clearSearch() {
    document.getElementById('searchCustomerInput').value = '';
    document.getElementById('searchItemInput').value = '';
    renderCustomerTable();
    renderItemTable();
}

function addItem() {
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const itemBrand = document.getElementById('itemBrand').value;
    const itemSize = document.getElementById('itemSize').value;
    const price = document.getElementById('price').value;

    const item = {
        id: itemId,
        name: itemName,
        brand: itemBrand,
        size: itemSize,
        price: price
    };

    items.push(item);
    $('#addItemModal').modal('hide');
    document.getElementById('addItemForm').reset();
    renderItemTable();
}

function renderItemTable() {
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = '';

    console.log(items)
    items.forEach((item, index) => {
        const row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.brand}</td>
                    <td>${item.size}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });


}

function deleteItem(index) {
    console.log('sdfds')
    console.log(index)
    items.splice(index, 1);
    renderItemTable();
}

function searchItem() {
    const searchInput = document.getElementById('searchItemInput').value;
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = '';

    const filteredItems = items.filter(item => item.id.includes(searchInput));
    filteredItems.forEach((item, index) => {
        const row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.brand}</td>
                    <td>${item.size}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

// Initial render
renderCustomerTable();
renderItemTable();


function refreshCustomerAndItemSelect() {
    // Get reference to customer select dropdown
    const customerSelect = document.getElementById('customerSelect');
    const itemSelect = document.getElementById('itemSelect');

    // Clear existing options
    customerSelect.innerHTML = '';
    itemSelect.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a customer';
    customerSelect.appendChild(defaultOption);

    const defaultOption2 = document.createElement('option');
    defaultOption2.value = '';
    defaultOption2.textContent = 'Select a item';
    itemSelect.appendChild(defaultOption2);

    // Add options for each customer
    customers.forEach(customer => {
        const optionVal = document.createElement('option');
        optionVal.value = customer.id;
        optionVal.textContent = customer.name; // You can also use customer.id if preferred
        customerSelect.appendChild(optionVal);
    });

    items.forEach(item => {
        const optionItem = document.createElement('option');
        optionItem.value = item.id;
        optionItem.text = item.name;
        itemSelect.appendChild(optionItem);
    });


    // Customer selection event
    customerSelect.addEventListener('change', () => {
        const selectedCustomer = customers.find(customer => customer.id === customerSelect.value);
        document.getElementById('customerNamei').value = selectedCustomer.name;
        document.getElementById('customerPhonei').value = selectedCustomer.phone;
        document.getElementById('customerAddressi').value = selectedCustomer.address;
    });

    // Item selection event
    itemSelect.addEventListener('change', () => {
        const selectedItem = items.find(item => item.id === itemSelect.value);
        console.log(selectedItem.price)
        document.getElementById('itemNamei').value = selectedItem.name;
        document.getElementById('itemPrice').value = selectedItem.price;
    });
}


// Add item button event
document.getElementById('addItemBtn').addEventListener('click', () => {
    const selectedItem = items.find(item => item.id === itemSelect.value);
    const itemQty = parseInt(document.getElementById('itemQty').value);
    const totalRowPrice = selectedItem.price * itemQty;

    const itemDetail = {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        qty: itemQty,
        totalRowPrice: totalRowPrice
    };

    itemDetails.push(itemDetail);
    updateItemDetailsTable();
    updateInvoiceSummary();

});

// Update item details table
function updateItemDetailsTable() {
    const tableBody = document.getElementById('itemDetailsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    itemDetails.forEach((item, index) => {
        const row = document.createElement('tr');

        console.log(item)
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
            <td>${item.totalRowPrice}</td>
            <td><button class="btn btn-danger" onclick="deleteItemdetails(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Delete item from details
function deleteItemdetails(index) {
    itemDetails.splice(index, 1);
    updateItemDetailsTable();
    updateInvoiceSummary();
}

// Update invoice summary
function updateInvoiceSummary() {
    const total = itemDetails.reduce((sum, item) => sum + item.totalRowPrice, 0);
    const discount = parseFloat(document.getElementById('discount').value);
    const subTotal = total - discount;
    const cash = parseFloat(document.getElementById('cash').value);
    const balance = cash - subTotal;

    document.getElementById('totalAmount').innerText = total;
    document.getElementById('subTotalAmount').innerText = subTotal.toFixed();
    document.getElementById('balanceAmount').innerText = balance.toFixed();
}

// Input event listeners for summary update
document.getElementById('cash').addEventListener('input', updateInvoiceSummary);
document.getElementById('discount').addEventListener('input', updateInvoiceSummary);




