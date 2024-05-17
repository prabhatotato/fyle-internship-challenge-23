# git scout -g

## Running Unit Tests

To run the unit tests and check the code coverage, follow these steps:

1. **Install Dependencies**: Ensure you have installed all dependencies by running:
    ```bash
    npm install
    ```

2. **Run Tests**: Execute the following command to run all tests and generate a coverage report:
    ```bash
    ng test --code-coverage
    ```

3. **View Coverage Report**: After the tests complete, a coverage report will be generated in the `coverage` directory. Open the `index.html` file in a web browser to view the detailed coverage report.

## Unit Tests

### UserComponent

- Test for creating the component.
- Test for rendering input field and search button.
- Test for updating the username property when input value changes.
- Test for emitting `searchUser` event with the correct username when form is submitted.
- Test for not emitting `searchUser` event when the username is empty.

### ApiService

- Test for creating the service.
- Test for retrieving user data from the API and caching it.
- Test for retrieving user repos from the API and caching them.
- Test for handling errors and returning an observable error.
