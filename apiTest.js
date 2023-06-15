const axios = require('axios');
const API1_URL = 'https://api1.example.com';
const API2_URL = 'https://api2.example.com';
const API1_KEY = 'example-api-key-1';
const API2_KEY = 'example-api-key-2';

async function fetchCustomersFromAPI1() {
    //Lets us save the url in a variable.
  const url = `${API1_URL}/api/v1/customer`;

   //Lets us save the key in a variable.
  const headers = { Authorization: API1_KEY };

  //Lets us try the GET method and if error we display an error msg.
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error while fetching customers from API 1:');
    throw error;
  }
}

async function saveCustomerToAPI2(customer) {

    //Lets us save the url in a variable.
  const url = `${API2_URL}/api/v1/customer`;

   //Lets us save the key in a variable.
  const headers = { Authorization: API2_KEY };

  //Lets us try the POST method and if error we display an error msg.
  try {
    const response = await axios.post(url, customer, { headers });
    return response.data;
  } catch (error) {
    console.error('Error while saving customer to API 2:');
    throw error;
  }
}

async function syncCustomers() {
  try {
    // Fetches customers from API 1 by calling the funciton.
    const customers = await fetchCustomersFromAPI1();

    // Saves each customer to API 2 by calling the function.
    for (const customer of customers) {
      await saveCustomerToAPI2(customer);
      console.log('Customer synced:', customer.id);
    }
     
    //If completed we display an message.
    console.log('Customer sync completed!');

    //if it fails we will display an error messag.
  } catch (error) {
    console.error('Error syncing customers:', error);
  }
}

//Starts the main function which calls the fetch and save functions.
syncCustomers();