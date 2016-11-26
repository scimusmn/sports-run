import React from 'react';

export class AthleteInfo extends React.Component {

    constructor(props) {

      super(props);

    }

    render() {

      return <div className={this.props.className} style={{pointerEvents: 'none'}}>
                <div className='athlete-info'>
                  <h3 className='name'>{this.props.name}</h3>
                  <h3 className='team'>{this.props.team}</h3>
                  <h3 className='speed'>{this.props.speed}</h3>
              </div>
            </div>;

    }

}
