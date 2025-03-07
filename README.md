

# Data Grid with Select-All and Status Filtering

This project is a simple **Next.js** application that demonstrates how to create a data grid/table. The table is populated with data from a provided JSON and includes interactive features such as selecting rows, checking statuses, and enabling a download button when certain conditions are met.

## Features

- **Select All Checkbox**: 
  - A checkbox at the top of the table allows selecting or deselecting all rows. 
  - The checkbox is in an **intermediate state** when only some rows are selected.
  
- **Row Selection**: 
  - Checkboxes are provided for each row.
  - Rows can be selected or deselected individually.
  
- **Status Filtering**:
  - Rows with the status of "Available" are highlighted with a **green dot** next to the status.
  
- **Download Selected**:
  - Only rows with a status of "Available" can be downloaded.
  - The **Download Selected** button is enabled only when all selected rows have the status "Available".
  - Clicking the **Download Selected** button shows an alert with the selected rows' data.

## Installation

To set up the project locally, follow these steps:

### 1. Clone the repository and install packages

```bash
git clone https://github.com/aniketbumbc/data-grid.git

cd data-grid
npm install
npm run dev


```bash
git clone https://github.com/aniketbumbc/data-grid.git

cd data-grid
npm install
npm run dev
npm test (for unit test case)
npm run test:coverage ( for unit test coverage )
```

### 2. Data Grid 

![Image](https://github.com/user-attachments/assets/da858bc7-ff62-4bb2-bdff-3cd5cce3f0c0)

### 3. Test Coverage

![Image](https://github.com/user-attachments/assets/3fc67087-d597-4193-a8ac-32bdefad95c5)

**Coverage**

![Image](https://github.com/user-attachments/assets/7075dd77-12d1-4c2d-a683-92df24430911)