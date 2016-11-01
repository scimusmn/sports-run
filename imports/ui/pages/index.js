import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export const Index = () => (
  <Jumbotron className='text-center'>
    <h3>Sports</h3>
    <h1>Run Component</h1>
    <p>Compare your sprinting speed to professional athletes.</p>
    <br/>
    <p><a className='btn btn-default' href='/selection' role='button'>Selection Screen</a></p>
    <p><a className='btn btn-default' href='/finish' role='button'>Finish Display</a></p>
  </Jumbotron>
);
