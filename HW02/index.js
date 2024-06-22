// Function to generate a random name
function generateName() {
  const names = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random surname
function generateSurname() {
  const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
  ];
  return surnames[Math.floor(Math.random() * surnames.length)];
}

// Function to generate a random email
function generateEmail(name, surname) {
  const domains = ["gmail.com", "mailru.com", "walla.com", "scum.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name.toLowerCase()}.${surname.toLowerCase()}@${domain}`;
}

// Function to generate a random phone number
function generatePhoneNumber() {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const centralOfficeCode = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 9000) + 1000;
  return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

// Function to generate a random ID
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

// Function to generate a full random profile
function generateRandomProfile() {
  const name = generateName();
  const surname = generateSurname();
  const email = generateEmail(name, surname);
  const phoneNumber = generatePhoneNumber();
  const id = generateId();

  return {
    name: name,
    surname: surname,
    email: email,
    phoneNumber: phoneNumber,
    id: id,
  };
}

// Export the functions
module.exports = {
  generateName,
  generateSurname,
  generateEmail,
  generatePhoneNumber,
  generateId,
  generateRandomProfile,
};
