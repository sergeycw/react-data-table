# React Data Table

A data table component for React with features including filtering, pagination, drag-and-drop, and local data storage capabilities

## Installation

To install and run the project locally, follow these steps:

```bash
# Clone server for this project
git clone git@github.com:burkov/assignment.git

# Configure CORS by adding the following to your main.ts file
app.enableCors({
  methods: 'POST',
  origin: '*',
  exposedHeaders: 'X-Total-Count',
});

# Clone this repository
git clone git@github.com:sergeycw/react-data-table.git

# Navigate to the project directory
cd react-data-table

# Install dependencies
npm install

# To run the app in development mode
npm run dev


