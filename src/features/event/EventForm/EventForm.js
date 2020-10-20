import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateEvent, createEvent } from '../eventActions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';

class EventForm extends Component {
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

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.handleFormSubmit}>
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={TextInput}
                placeholder='What is your event about?'
              />
              <Field
                name='description'
                component={TextInput}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={TextInput}
                placeholder='Event City'
              />
              <Field
                name='venue'
                component={TextInput}
                placeholder='Event Venue'
              />
              <Field
                name='date'
                component={TextInput}
                placeholder='Event Date'
              />

              <Button positive type='submit'>
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type='button'>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
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
