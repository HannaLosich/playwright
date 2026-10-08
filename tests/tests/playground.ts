//const retries: number = "five";  // What does VS Code show?
// retries - is not assignable to type 'number'

const user = { email: "john@test.com" };

//console.log(user.password);      // What does VS Code show?
// Property 'password' does not exist on type '{ email: string; }'.



//FIX THIS Task

function getTimeout(seconds: number): number {  // What does VS Code show?
  return seconds * 1000;  // Hint: look at the return type
}

//FIX THIS Task

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters

//FIX THIS Task

function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = undefined;
if (userName !== undefined) {
  printName(userName);
}

//Product task

//  Create a type for test data
type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

// Create two products using the Product type
const product1: Product = {
  name: "Laptop",
  price: 999.99,
  inStock: true,
};

const product2: Product = {
  name: "Mouse",
  price: 9.99,
  inStock: false,
};

// formatPrice function
function formatPrice(price: number): string {
  return `$${price}`;
}

// Usage
console.log(formatPrice(product2.price)); // "$9.99"
