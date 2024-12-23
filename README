# Simple Database in C

This project implements a simple database using C, capable of handling basic SQL-like operations such as `insert` and `select`. The database stores records in memory and provides a command-line interface for interacting with it.

## Features

- **Insert Records**: Insert new rows containing an `ID`, `username`, and `email`.
- **Select Records**: Retrieve and display all records from the database.
- **Meta Commands**: Recognizes meta-commands like `.exit` to exit the program.
- **Table Management**: Implements basic table management with a fixed number of rows and pages.
- **Row Validation**: Ensures the integrity of row data, such as ensuring IDs are positive, and strings are within size limits.

## Structure

### `Row`

A row represents a record in the database and consists of:
- `id`: A unique identifier for the row (must be positive).
- `username`: A string representing the user's username (maximum 32 characters).
- `email`: A string representing the user's email address (maximum 255 characters).

### `Table`

A table holds rows of data. The table is divided into pages, and each page can store a set number of rows. The table has a maximum of 100 pages, and each page can hold 4096 bytes. This gives a maximum of 1,400 rows.

### Commands Supported

- `insert <id> <username> <email>`: Inserts a row with the given ID, username, and email into the database.
- `select`: Displays all rows in the database.
- `.exit`: Exits the program.
  
### Error Handling

The program checks for common errors such as:
- Invalid commands or syntax errors in `insert` statements.
- Inserting rows with string fields that exceed the allowed length.
- Inserting rows with a negative ID.
- Trying to insert a row when the table is full.

### Key Functions

- `new_input_buffer()`: Allocates memory for input buffer.
- `read_input()`: Reads input from the user.
- `prepare_statement()`: Prepares the SQL statement by parsing it.
- `execute_statement()`: Executes the prepared statement (either `insert` or `select`).
- `serialize_row()`: Serializes a row into memory.
- `deserialize_row()`: Deserializes a row from memory.
- `row_slot()`: Returns the memory address of a specific row in the table.
- `new_table()`: Allocates memory for a new table.
- `free_table()`: Frees the memory used by a table.

## Building and Running

To compile and run the program:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/simple-database.git
   cd simple-database
   ```

2. **Compile the program:**
   ```bash
   gcc -o db db.c
   ```

3. **Run the program:**
   ```bash
   ./db
   ```

4. **Interact with the database:**
   - Insert records: `insert 1 user1 person1@example.com`
   - View records: `select`
   - Exit: `.exit`

## Example

```text
db > insert 1 user1 person1@example.com
Executed.
db > select
(1, user1, person1@example.com)
Executed.
db > .exit
```

## Testing

To test the database functionality, you can use the following:

- **Insert a record:**
  ```bash
  insert 1 user1 person1@example.com
  ```

- **Select records:**
  ```bash
  select
  ```

- **Exit the program:**
  ```bash
  .exit
  ```

The database will print appropriate messages based on the command and input.

## Limitations

- The database currently supports a maximum of 1400 rows.
- Only basic commands like `insert` and `select` are supported.
- The database is in-memory only, so data is lost when the program exits.