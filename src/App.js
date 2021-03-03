import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: [],
      nat: [],
      details: [""],
      choosengender:"male",
      choosennat:"AU",
      totalpages: Number,
      currentpage: 1,
      pagesize: 20,
    };
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ currentpage: 1 });
    let nat = this.natdd.value;
    let gender = this.genderdd.value;
    let pagesize = this.pagesize.value;
    this.setState({choosengender:gender});
      this.setState({choosennat:nat});
    fetch(
      "http://localhost:8080/api?page=" +
        this.state.currentpage +
        "&nat=" +
        nat +
        "&gender=" +
        gender +
        "&results=" +
        pagesize
    )
      .then((res) => res.json())
      .then((data) => {
        let details = data.details;
        let totalPages = data.totalPages;
        let currentPage = data.currentPage;
        let detailsArr = [];
        let temp = [];
        temp.push(<th>{"Thumbnail"}</th>);
        temp.push(<th>{"Name"}</th>);
        temp.push(<th>{"Gender"}</th>);
        temp.push(<th>{"Nationality"}</th>);
        temp.push(<th>{"Email"}</th>);
        temp.push(<th>{"Phone"}</th>);
        detailsArr.push(<tr>{temp}</tr>);

        this.setState({ details: [""] });
        temp = [];
        for (let i in details) {
          temp.push(
            <td>
              <img src={details[i].thumbnail} />
            </td>
          );
          temp.push(<td>{details[i].fullname}</td>);
          temp.push(<td>{details[i].gender}</td>);
          temp.push(<td>{details[i].nat}</td>);
          temp.push(<td>{details[i].email}</td>);
          temp.push(<td>{details[i].phone}</td>);
          detailsArr.push(<tr>{temp}</tr>);
          temp = [];
        }
        this.setState({ details: [""] });
        this.setState({ details: detailsArr });
        this.setState({ totalpages: totalPages });
        this.setState({ currentpage: currentPage });
        this.setState({ pagesize: this.pagesize });
      });
  };

  async previousPage() {
    console.log("Previous");
    if (this.state.currentpage > 1) {
      this.setState({ currentpage: this.state.currentpage - 1 });
      await fetch(
        "http://localhost:8080/api?page=" +
          this.state.currentpage +
          "&nat=" +
          this.state.choosennat +
          "&gender=" +
          this.state.choosengender +
          "&results=" +
          this.pagesize
      )
        .then((res) => res.json())
        .then((data) => {
          let details = data.details;
          let totalPages = data.totalPages;
          let currentPage = data.currentPage;
          let detailsArr = [];
          let temp = [];
          temp.push(<th>{"Thumbnail"}</th>);
          temp.push(<th>{"Name"}</th>);
          temp.push(<th>{"Gender"}</th>);
          temp.push(<th>{"Nationality"}</th>);
          temp.push(<th>{"Email"}</th>);
          temp.push(<th>{"Phone"}</th>);

          this.setState({ details: [""] });
          detailsArr.push(<tr>{temp}</tr>);
          temp = [];
          for (let i in details) {
            temp.push(
              <td>
                <img src={details[i].thumbnail} />
              </td>
            );
            temp.push(<td>{details[i].fullname}</td>);
            temp.push(<td>{details[i].gender}</td>);
            temp.push(<td>{details[i].nat}</td>);
            temp.push(<td>{details[i].email}</td>);
            temp.push(<td>{details[i].phone}</td>);
            detailsArr.push(<tr>{temp}</tr>);
            temp = [];
          }
          this.setState({ details: [""] });
          this.setState({ details: detailsArr });
          this.setState({ totalpages: totalPages });
          this.setState({ currentpage: this.currentpage });
        });
    }
  }
  async nextPage() {
    console.log("Next");
    console.log(this.state.currentpage, " cp\n");
          console.log(this.state.nat, " n\n");
          console.log(this.state.gender, " g\n");
          console.log(this.state.pagesize, " p\n");
    if (this.state.totalpages >= this.state.currentpage) {
      this.setState({ currentpage: this.state.currentpage + 1 });
      await fetch(
        "http://localhost:8080/api?page=" +
          this.state.currentpage +
          "&nat=" +
          this.state.choosennat +
          "&gender=" +
          this.state.choosengender +
          "&results=" +
          this.state.pagesize
      )
        .then((res) => res.json())
        .then((data) => {
          
          let details = data.details;
          let totalPages = data.totalPages;
          let currentPage = data.currentPage;
          let detailsArr = [];
          let temp = [];
          temp.push(<th>{"Thumbnail"}</th>);
          temp.push(<th>{"Name"}</th>);
          temp.push(<th>{"Gender"}</th>);
          temp.push(<th>{"Nationality"}</th>);
          temp.push(<th>{"Email"}</th>);
          temp.push(<th>{"Phone"}</th>);
          detailsArr.push(<tr>{temp}</tr>);
          temp = [];
          console.log(details);


          this.setState({ details: [""] });
          for (let i in details) {
            temp.push(
              <td>
                <img src={details[i].thumbnail} />
              </td>
            );
            temp.push(<td>{details[i].fullname}</td>);
            temp.push(<td>{details[i].gender}</td>);
            temp.push(<td>{details[i].nat}</td>);
            temp.push(<td>{details[i].email}</td>);
            temp.push(<td>{details[i].phone}</td>);
            detailsArr.push(<tr>{temp}</tr>);
            temp = [];
          }
          console.log(detailsArr);
          this.setState({ details: detailsArr });
          this.setState({ totalpages: totalPages });
          this.setState({ currentpage: currentPage });
        });
    }
  }
  componentDidMount() {
    fetch("http://localhost:8080/api/2")
      .then((res) => res.json())
      .then((data) => {
        let gender = data.gender;
        let nat = data.countryCode;
        let genderArr = [];
        let natArr = [];
        for (let i in gender) {
          genderArr.push(<option value={gender[i]}>{gender[i]}</option>);
        }
        for (let i in nat) {
          natArr.push(<option value={nat[i]}>{nat[i]}</option>);
        }
        this.setState({ gender: genderArr });
        this.setState({ nat: natArr });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tr colspan={2}>
              <td>
                <h3>Better Place Interview Task</h3>
              </td>
            </tr>
            <tr>
              <td>Gender: </td>
              <td>
                <select
                  name={"gender"}
                  id={"gender"}
                  ref={(input) => (this.genderdd = input)}
                >
                  {this.state.gender}
                </select>
              </td>
            </tr>
            <tr>
              <td>Nationality: </td>
              <td>
                <select
                  name={"nat"}
                  id={"nat"}
                  ref={(input) => (this.natdd = input)}
                >
                  {this.state.nat}
                </select>
              </td>
            </tr>
            <tr>
              <td>Select Page Size:</td>
              <td>
                <select
                  name={"pagesize"}
                  id={"pagesize"}
                  ref={(input) => (this.pagesize = input)}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </td>
            </tr>
            <tr colspan={2}>
              <td>
                <input type={"submit"} value={"Submit"} />
              </td>
            </tr>
          </table>
        </form>
        <div id={"container"}>
          <button onClick={this.previousPage}>Previous</button>
          <button onClick={this.nextPage}>Next</button>
          <table>{this.state.details}</table>
        </div>
      </div>
    );
  }
}
export default App;
