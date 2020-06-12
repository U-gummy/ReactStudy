import React, {Component} from 'react';

class TOC extends Component {
  // 불필요 하게 toc의 render 함수가 호출되지 않게 shouldComponentUpdate 에서 분기 
  shouldComponentUpdate(newProps, newState) {  // 새롭게 바뀐값과 이전값에 접근 가능 
    console.log("TOC shouldComponentUpdate");
    console.log('newProps, this.props: ', newProps.data,this.props.data);
    if (this.props.data == newProps.data) {
      return false; // ture면 아래 render 호출
    }
    return true; // ture면 아래 render 호출
  }
    render () {
      console.log("TOC render");
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
              <li key={data[i].id}>
                <a 
                  href={"/content/"+data[i].id}
                  data-id={data[i].id}
                  onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id);
                  }.bind(this)}
                >{data[i].title}</a>
              </li>
            );
            i = i + 1;
        }
        return (
        <nav>
          <ul>
             {lists}
          </ul>
      </nav>
      );
    }
  }

export default TOC;