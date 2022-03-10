import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { marked } from "marked";
import parse from 'html-react-parser';

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    this.props.editorChange(event.target.value);
  }
  
  render(){
    return (
      <div id="editor-section">
        <div class="bar"><i class="fab fa-free-code-camp"></i>  Editor</div>
          <textarea name="adsfas" value={this.props.text} id="editor" class="window" onChange={this.handleChange}/>
        </div>      
    );
  }    
}
  
function Preview(props){
  
  const markDown = marked.parse(props.text);
  console.log(markDown);
  return(
    <div id="preview-section">
      <div class="bar"><i class="fab fa-free-code-camp"></i>  Preview</div>
      <div id="preview" class="window">{parse(markDown)}</div>       
      </div>
  );
}
  
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editor: placeholder,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  
  handleEditorChange(text){
    this.setState({editor:text});
  }
    
  render(){
    return(
      <div id="content">
      <Editor text={this.state.editor} editorChange={this.handleEditorChange}/>
      <Preview text={this.state.editor}/>
      </div>
    );
    
    }
}
  
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
  
ReactDOM.render(<App/>,document.getElementById("app"));


