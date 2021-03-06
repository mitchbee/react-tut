import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }

toggleGuestPropertyAt = (property, indexToChange) =>
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return{
          ...guest,
          [property]: !guest[property]
        };
      }
      return guest;
    })
  });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  removeGuestAt = index =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0,index),
        ...this.state.guests.slice(index+1)
      ]
    });

toggleEditingAt = index =>
  this.toggleGuestPropertyAt("isEditing", index);

setNameAt = (name, indexToChange) =>
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return{
          ...guest,
          name
        };
      }
      return guest;
    })
  });

toggleFilter = () =>
  this.setState({ isFiltered: !this.state.isFiltered });

handleNameInput = e =>
  this.setState({pendingGuest: e.target.value});

newGuestSubmitHandler = e => {
  e.preventDefault();
  this.setState({
    guests: [
      {
        name: this.state.pendingGuest,
        isConfirmed: false,
        isEditing: false
      },
      ...this.state.guests
    ],
    pendingGuest: ''
  });
}

getTotalInvited = () => this.state.guests.length;

getAttengingGuests = () =>
  this.state.guests.reduce(
    (total, guest) => guest.isConfirmed ? total+1 : total,
    0
  );

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttengingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <Header
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          handleNameInput={this.handleNameInput}
          pendingGuest={this.state.pendingGuest}
          />
        <MainContent
          toggleFilter={this.toggleFilter}
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
        />
      </div>
    );
  }
}

export default App;
