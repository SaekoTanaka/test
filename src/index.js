import React from 'react';
import ReactDOM from 'react-dom';

function init() {
    localStorage.setItem(1, 'Taro');
    localStorage.setItem(2, 'Jiro');
    localStorage.setItem(3, 'Saburo');
}

class MyApplauseLeftOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    render () {
        return (
            <p>拍手できる: {this.state.value}</p>
        )
    }
}

 class MyApplauseButton extends React.Component {
     constructor(props) {
         super(props);
         this.state = {value: this.props.value};
         this.buttonClicked = this.buttonClicked.bind(this);
     }
    
     buttonClicked(event) {
         if(this.state.value <= 14) {
             this.setState({value: this.state.value + 1});
         }
     }
    
     render() {
         return (
             <div>
                 <button onClick={this.buttonClicked}>拍手</button>
                 <div>{this.state.value}</div>
             </div>
         );
     }
 }

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        if (this.state.value.length > 5) {
            localStorage.setItem('post', this.state.value);
        }
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="投稿" />
            </form>
        );
    }
}

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applauseleftover: 100,
            applausegiven: 5,
            applause: 0,
            useroptions: ['Taro', 'Jiro']
        }
    }

    nameOptions () {
        const options = this.useroptions.map((name) => 
            <option>{name}</option>
        );
        return (
            <select>{options}</select>
        );
    }

    render () {
        init();
        return (
        <div>
            <div className="user-info">
                <p>pic</p>
                {this.nameOptions}
            </div>
            <div className="applause-info">
                <MyApplauseLeftOver value={100 - this.state.applause * 2}/>
                <p>拍手された: {this.state.applausegiven}</p>
            </div>
            <div className="posts">
                <p>pic</p>
                {this.nameOptions}
                <PostForm />
            </div>
            <div>
                <MyApplauseButton value={this.state.applause}/>
            </div>
        </div>
        );
    }
}

// =======================================
ReactDOM.render(
    <Body />,
    document.getElementById('root')
);
  