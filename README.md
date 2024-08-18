# Menu Management Backend

This is a Node.js backend application for managing restaurant menus, including categories, subcategories, and items.

## Features

- Create, read, update, and delete menu categories
- Create, read, update, and delete menu subcategories
- Create, read, update, and delete menu items
- Associate items with categories or subcategories
- Search functionality for menu items

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (usually comes with Node.js)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/menu-management-backend.git
   ```

2. Navigate to the project directory:
   ```
   cd menu-management-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/menu_management
   ```
   Adjust the `PORT` and `MONGODB_URI` as needed.

## Running the Application

To run the application locally:

1. Start your MongoDB server.

2. Run the following command in the project root directory:
   ```
   npm start
   ```

The server should now be running on `http://localhost:3000` (or whichever port you specified in the `.env` file).

## API Endpoints

### Categories

- `POST /api/categories`: Create a new category
- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get a specific category
- `PUT /api/categories/:id`: Update a category
- `DELETE /api/categories/:id`: Delete a category

### Subcategories

- `POST /api/subcategories`: Create a new subcategory
- `GET /api/subcategories`: Get all subcategories
- `GET /api/subcategories/:id`: Get a specific subcategory
- `PUT /api/subcategories/:id`: Update a subcategory
- `DELETE /api/subcategories/:id`: Delete a subcategory

### Items

- `POST /api/items`: Create a new item
- `GET /api/items`: Get all items
- `GET /api/items/:id`: Get a specific item
- `PUT /api/items/:id`: Update an item
- `DELETE /api/items/:id`: Delete an item
- `GET /api/items/search/:query`: Search for items by name

## Testing

To run the tests (if you have implemented any):

```
npm test
```

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, please contact Prathamesh Powar at prathameshpowar19@gmail.com .
