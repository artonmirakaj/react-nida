import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateEvent, createEvent } from '../eventActions';
import { Button, Form, Segment } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';

class EventForm extends Component {
  state = { ...this.props.event };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent,
      });
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Field name='title' component={TextInput} placeholder='Event Title' />
          <Form.Field>
            <label>Event Date</label>
            <input
              name='date'
              value={date}
              onChange={this.handleInputChange}
              type='date'
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              value={city}
              onChange={this.handleInputChange}
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              value={venue}
              onChange={this.handleInputChange}
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              value={hostedBy}
              onChange={this.handleInputChange}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return { event };
};

const mapDispatchToProps = (dispatch) => ({
  createEvent: (newEvent) => dispatch(createEvent(newEvent)),
  updateEvent: (event) => dispatch(updateEvent(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'eventForm' })(EventForm));
