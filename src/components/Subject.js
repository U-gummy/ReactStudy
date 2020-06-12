import React, {Component} from 'react';

class Subject extends Component {
    render () {
      return (
        // 최상위 태그는 하나만 써야한다 
        <header> 
          <h1><a href="/" onClick={function(e){
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>{this.props.title}</a></h1>
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;