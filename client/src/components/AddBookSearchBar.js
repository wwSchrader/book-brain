import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';

class AddBookSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
    };

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchBarChange(e) {
    this.setState({searchBar: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchBar.length > 0) {
      // send search query to server
      console.log('Search Submitted!');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId='addBookSearchBar'>
          <FormControl
              type='text'
              value={this.state.searchBar}
              onChange={this.handleSearchBarChange}
          />
        </FormGroup>
        <Button type='submit'>Search</Button>
      </form>
    );
  }
}

export default AddBookSearchBar;
