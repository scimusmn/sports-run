import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'Draggable';
import { Button } from 'react-bootstrap';

export class AbsoluteContainer extends React.Component {

  constructor(props) {

    super(props);
    this.dragRefs = [];
    this.copyStyles = this.copyStyles.bind(this);
    this.referenceToggle = this.referenceToggle.bind(this);

  }

  componentDidMount() {

    // DOM is rendered and
    // ready for manipulation
    // and animations.

    // If in edit mode, make all elements draggable
    if (this.props.lock == false) {

      console.log('AbsoluteContainer: Unlocked');
      var options = {
        setCursor: true,
        useGPU: false,
        onDragEnd: function(el, x, y, event) {
          console.log('onDragEnd', x, y);
          console.log(el);
        },
      };

      for (var i = 0; i < this.dragRefs.length; i++) {
        const ref = this.dragRefs[i];
        const element = ReactDOM.findDOMNode(this.refs[ref]);
        new Draggable(element, options);
      }

    }

  }

  componentWillUnmount() {

    // DOM is about to become
    // inaccessible. Clean up
    // all timers ans tweens.

  }

  renderChildren() {

    // Assign reference ids to all children
    const children = React.Children.map(this.props.children,
      (child, index) => {

        // If custom ref id has
        // already been assigned,
        // assign our own.

        // let ref = child.ref;
        // if (!ref) ref = 'child_' + index;

        const ref = 'child_' + index;
        console.log('in ', ref, '[');

        this.dragRefs.push(ref);
        return React.cloneElement(child, { key:index, className:ref, ref: ref });

      }
    );

    return children;

  }

  renderReference() {

    let jsx = '';

    if (this.props.lock == false && this.props.reference && this.props.reference != '') {
      jsx = <img ref='bgReference' style={{position: 'absolute', top:0, left:0, opacity:1}} src={this.props.reference}/>;
    }

    return jsx;

  }

  renderTool() {

    let jsx = '';

    if (this.props.lock == false) {

      jsx = <div style={{position: 'absolute', zIndex: 9999, top:0, right:90}}>
              <Button style={{background:'rgb(0,255,0)'}} onClick={this.copyStyles}>
                copy
              </Button>
              <Button style={{background:'rgb(0,255,0)'}} onClick={this.referenceToggle}>
                reference
              </Button>
            </div>;
    }

    return jsx;

  }

  referenceToggle() {

    // Toggle visibility/opacity of reference background

    const element = ReactDOM.findDOMNode(this.refs.bgReference);
    const opac = window.getComputedStyle(element).getPropertyValue('opacity');

    if (opac == 1) {
      element.style.opacity = 0.4;
    } else if (opac == 0.4) {
      element.style.opacity = 0;
    } else {
      element.style.opacity = 1;
    }

  }

  copyStyles() {

    let styleOut = '';
    if (this.props.classParent) {
      styleOut += '.' + this.props.classParent + '{';
    }

    // Loop through all references
    // and collect css cooridinates
    for (var i = 0; i < this.dragRefs.length; i++) {
      const ref = this.dragRefs[i];
      const element = ReactDOM.findDOMNode(this.refs[ref]);

      const clName = ref;
      const absTop = window.getComputedStyle(element).getPropertyValue('top');
      const absLeft = window.getComputedStyle(element).getPropertyValue('left');

      let childStyle = '.' + clName + '{';
      childStyle += 'position:absolute;';
      childStyle += 'top:' + absTop + ';';
      childStyle += 'left:' + absLeft + ';';
      childStyle += '}';

      styleOut += childStyle;

    }

    if (this.props.classParent) {
      styleOut += '}';
    }

    // NOTE : Check console for output
    // CSS will be ugly. Beautify here:
    // http://www.cleancss.com/css-beautify/
    console.log('/* Absolute Container positions. Paste into CSS. */');
    console.log(styleOut);
    console.log('/*  */');

    window.prompt('Copy to clipboard. Paste into CSS.', styleOut);

  }

  render() {

    return <div className={this.props.classParent}>
      {this.renderReference()}
      {this.renderChildren()}
      {this.renderTool()}
    </div>;

  }
}

AbsoluteContainer.propTypes = {
  lock: React.PropTypes.bool,
  reference: React.PropTypes.string,
  classParent: React.PropTypes.string,
};
