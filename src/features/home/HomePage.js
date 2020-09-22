import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { Button, Icon } from 'semantic-ui-react';

const HomePage = ({ history }) => {
  return (
    <Fragment>
      <section>
        <ul>
          <li>
            <Link as='a'>
              <Icon name='thumbs up icon' />
              <span> - Like </span>
            </Link>
          </li>
          <li>
            <Link as='a'>
              <Icon name='comments icon' />
              <span> - Comment </span>
            </Link>
          </li>
          <li>
            <Link as='a'>
              <Icon name='share' />
              <span> - Share </span>
            </Link>
          </li>
          <li>
            <Link as='a'>
              <Icon name='heart' />
              <span> - Subscribe </span>
            </Link>
          </li>
        </ul>
        <div className='content'>
          <h2>Welcome</h2>
          <Button
            onClick={() => history.push('/events')}
            size='huge'
            inverted
          >
            Get started
            <Icon name='angle double right' />
          </Button>
        </div>
        <div className='wave' />
      </section>
      <div className='main'>
          <p>Random text</p>
        </div>
    </Fragment>
  )
}

export default HomePage;