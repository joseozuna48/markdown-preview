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
    let button;
    let minHeight = "40vh";
    if(this.props.showOther){
      minHeight = "40vh";
      button = <i class="fas fa-expand-arrows-alt" onClick={this.props.handleMaximize}></i>;
    }else{
      minHeight = "100vh";
      button = <i class="fas fa-compress-arrows-alt" onClick={this.props.handleMaximize}></i>;
    }
    return (
      <div id="editor-section">
        <div class="bar"><i class="fab fa-free-code-camp"></i>  Editor {button}</div>
          <textarea name="adsfas" value={this.props.text} id="editor"
          style={{minHeight:minHeight}} class="window" onChange={this.handleChange}/>
        </div>      
    );
  }    
}
  
function Preview(props){
  
  const markDown = marked.parse(props.text);
  // console.log(markDown);

  let button;
  let minHeight = "40vh";
  if(props.showOther){
    minHeight = "40vh";
    button = <i class="fas fa-expand-arrows-alt" onClick={props.handleMaximize}></i>;
  }else{
    minHeight = "100vh";
    button = <i class="fas fa-compress-arrows-alt" onClick={props.handleMaximize}></i>;
  }

  return(
    <div id="preview-section">
      <div class="bar"><i class="fab fa-free-code-camp"></i>  Preview {button}</div>
      <div id="preview" style={{minHeight:minHeight}} class="window">{parse(markDown)}</div>       
      </div>
  );
}
  
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editor: placeholder, 
      showEditor: true,
      showPreview: true,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleEditMaximize = this.handleEditMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  
  handleEditorChange(text){
    this.setState({editor:text});
  }

  handleEditMaximize(e){
    this.setState({showPreview: !this.state.showPreview});
  
  }

  handlePreviewMaximize(e){
    this.setState({showEditor: !this.state.showEditor});
  }
    
  render(){
    return(
      <div id="content">
      {this.state.showEditor &&
       <Editor text={this.state.editor}
        editorChange={this.handleEditorChange}
          handleMaximize = {this.handleEditMaximize}
          showOther = {this.state.showPreview}
        />  
       }

      {this.state.showPreview && 
      <Preview text={this.state.editor}
        showOther = {this.state.showEditor}
        handleMaximize = {this.handlePreviewMaximize}
      /> }
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


