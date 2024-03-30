
## Node CRUD Application with Authentication

This CRUD (Create, Read, Update, Delete) application allows users to manage products, categories, and user accounts. Users can perform the following operations:

- **Register**: New users can create an account by providing their name, email, and password.
- **Login**: Registered users can log in using their email and password to access the application's features.
- **Create Product**: Logged-in users can add new products by providing the name, description, price, and selecting a category for the product.
- **Read Product**: Users can view a list of all products or view details of a specific product by its ID.
- **Update Product**: Logged-in users can edit the details of an existing product, including the name, description, price, and category.
- **Delete Product**: Logged-in users can delete a product from the database.
- **Create Category**: Logged-in users can create new categories by providing the category name and description.
- **Read Category**: Users can view a list of all categories or view details of a specific category by its ID.
- **Update Category**: Logged-in users can edit the details of an existing category, including the name and description.
- **Delete Category**: Logged-in users can delete a category from the database, along with all products associated with that category.

The application uses JWT (JSON Web Tokens) for authentication, ensuring that only authorized users can perform CRUD operations on products, categories, and user accounts. The API endpoints are protected, requiring users to include a valid JWT token in the request headers.

This CRUD app provides a comprehensive solution for managing products, categories, and user accounts, catering to various use cases such as e-commerce, inventory management, and more.

