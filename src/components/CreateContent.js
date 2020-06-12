import React, {Component} from 'react';

class CreateContent extends Component {
    render () {
        console.log("Content render");
        return (
            <article>
                <h2>CreateContent</h2>
                <form action="/create_process" method="post"
                    onSubmit={function(e){
                        e.preventDefault(); // 페이지 전환 막기
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        );
                    }.bind(this)}
                >
                    <p><input type="text" name="title" placeholder="title"/></p>
                    <p><textarea name="desc" placeholder="description"></textarea></p>
                    <p><input type="submit" value="submit"/></p>
                </form>
            </article>
            );
        }
    }

export default CreateContent;