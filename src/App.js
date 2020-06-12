import React, {Component} from 'react';
import TOC from "./components/TOC.js";
import ReadContent from "./components/ReadContent.js";
import CreateContent from './components/CreateContent.js';
import UpdateContent from './components/UpdateContent.js';
import Subject from "./components/Subject.js";
import Control from "./components/Control.js";
import './App.css';

class App extends Component {
    // component 초기화
    constructor(props) {
        super(props);
        // component 초기화 후 코드작성 state 초기화
        // props의 값이나 state 값이 바뀌면 그 state를 가지고 있는 component의 render 함수가 다시 호출 
        // 즉, 화면이 다시 그려짐.
        this.max_content_id = 3; //  마지막 state contents 마지막 id 
        this.state = {
            mode:"welcome",
            selected_content_id : 1,
            subject: {title: "WEB",sub: "World Wid Web!"},
            welcome: {title:"Welcome", desc:"HELLO, React!!"},
            contents: [
                {id:1, title:"HTML", desc:"HTML is HyperText Markup Language."},
                {id:2, title:"CSS", desc:"CSS is HyperText for design."},
                {id:3, title:"JaveScript", desc:"JaveScript is for interactive."}
            ]
        }
    }
    getReadContent() {
        var i = 0;
        while(i < this.state.contents.length){
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id){
              return data;
                break;
            }
            i = i + 1;
        }
    }
    getContent() {
        console.log("app render");
        var _title, _desc , _article = null;
        if(this.state.mode === "welcome") { // 모드가 welcome 인 경우
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>
        } else if (this.state.mode === "read") { // 모드가 read 인 경우
            var _content = this.getReadContent();
            _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>
        } else if(this.state.mode === "create"){ // 모드가 create 인 경우
            _article = <CreateContent onSubmit={function(_title, _desc){
                // setState를 통해서 새로운 content값 추가 
                this.max_content_id = this.max_content_id + 1;
                // concat 은 원본 데이터를 변경시키지 않고 추가 
                // var _contents = this.state.contents.concat({id:this.max_content_id,title:_title, desc:_desc})
                var newContents = Array.from(this.state.contents);
                newContents.push({id:this.max_content_id,title:_title, desc:_desc});
                this.setState({
                    // contents: _contents
                    contents: newContents,
                    mode:"read",
                    selected_content_id : this.max_content_id

                })
            }.bind(this)}></CreateContent>
        } else if(this.state.mode === "update"){ // 모드가 update 인 경우
            _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
                var _contents = Array.from(this.state.contents); // 원본 데이더를 바꾸지 않고 복제
                var i = 0;
                while(i < _contents.length) {
                    if(_contents[i].id === _id) {
                        _contents[i] = {id:_id, title:_title, desc:_desc}
                        break;
                    }
                    i = i + 1;
                }
                this.setState({
                    contents: _contents,
                    mode: "read"
                })
            }.bind(this)}></UpdateContent>
        }
        return _article;
    }

    render() {
        return ( 
            <div className="App">
                <Subject 
                    title = {this.state.subject.title}
                    sub = {this.state.subject.sub} 
                    onChangePage={function(){
                        this.setState({
                            mode:"welcome"
                        });
                    }.bind(this)}
                >
                </Subject> 
                <TOC 
                    onChangePage={function(id){
                        this.setState({
                            mode:"read",
                            selected_content_id: Number(id)
                        })
                    }.bind(this)}
                    data={this.state.contents}>
                </TOC> 
                <Control onChangeMode={function(_mode){
                    if(_mode === "delete") {
                        if(window.confirm("really?")) {
                            var _contents = Array.from(this.state.contents)
                            var i = 0;
                            while(i < _contents.length) {
                                if(_contents[i].id === this.state.selected_content_id) {
                                    _contents.splice(i,1);
                                    break;
                                }
                                i = i + 1;
                            }
                            this.setState({
                                mode: "welcome",
                                contents:_contents
                            })
                            alert("deleted!!");
                        }
                    } else {
                        this.setState({
                            mode: _mode
                        })
                    }
                }.bind(this)}></Control>
                {this.getContent()}
            </div>
        );
    }
}

export default App;
